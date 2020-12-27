import * as http from 'http'
import config from './config'
import logger from './logger'
import * as Redis from 'ioredis'

const redis = new Redis({
  host: config.redisHost,
  port: config.redisPort,
  password: config.redisPassword,
})

function onRequest(originalReq: http.IncomingMessage, originalRes: http.ServerResponse) {
  // TODO: More reliable way to retrieve IP address
  const originalIp = (typeof originalReq.headers['x-forwarded-for'] === 'string' && originalReq.headers['x-forwarded-for'].split(',').shift()) || originalReq.connection?.remoteAddress

  // TODO: Rate limiting per route
  redis
    .get(originalIp)
    .then(data => {
      const timeframe = Date.now() - 1000 * 60 // 1 minute
      const maxRequestsPerTimeframe = 10

      let requests = []

      // Add current request to list
      requests.push(Date.now())

      if (data) {
        const parsedData = JSON.parse(data)

        // Remove too old requests from list
        requests.push(...parsedData.filter((request: number) => request >= timeframe))
      }

      redis
        .set(originalIp, JSON.stringify(requests))
        .then(() => {}) // Doesn't need to block the response therefore we don't wait
        .catch(error => {
          logger.error(error)
        })

      /**
       * Max X requests in timeframe (X + 1 since we already added the current
       * request to this list)
       */
      if (requests.length >= (maxRequestsPerTimeframe + 1)) {
        originalRes.statusCode = 429

        // Time till next request
        const seconds = Math.ceil((requests.sort((a, b) => a - b)[requests.length - maxRequestsPerTimeframe] - timeframe) / 1000)
        originalRes.setHeader('Retry-After', seconds)

        originalRes.end()
        return
      }

      const options: http.RequestOptions = {
        hostname: 'localhost',
        method: originalReq.method,
        headers: originalReq.headers
      }

      switch (originalReq.url.split('/')[1]) {
        case 'authentication':
          options.port = 3003
          options.path = originalReq.url.replace('/authentication', '')
          break;

        default:
          break;
      }

      logger.log(`Serving: ${ originalReq.method } ${ originalReq.url } -> localhost:${ options.port }${ options.path }`)

      const proxy = http.request(options, (res) => {
        originalRes.writeHead(res.statusCode, res.headers)
        res.pipe(originalRes, {
          end: true
        })
      })

      originalReq.pipe(proxy, {
        end: true
      })
    })
    .catch(error => {
      logger.error(error)
    })
}

http
  .createServer(onRequest)
  .listen(config.port, () => {
    logger.log('Server started.')
  })
