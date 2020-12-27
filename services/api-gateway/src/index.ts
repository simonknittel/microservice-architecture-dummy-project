import * as http from 'http'
import config from './config'
import logger from './logger'
import rateLimit from './middleware/rate-limit'

function onRequest(originalReq: http.IncomingMessage, originalRes: http.ServerResponse) {
  rateLimit(originalReq, originalRes)
    .then(() => {
      const options: http.RequestOptions = {
        hostname: 'localhost',
        method: originalReq.method,
        headers: originalReq.headers
      }

      const serviceName = originalReq.url.split('/')[1]

      if (config.services[serviceName]) {
        const service = config.services[serviceName]
        options.port = service.port
        options.path = originalReq.url.replace(`/${ serviceName }`, '')
      } else {
        logger.log(`Serving: ${ originalReq.method } ${ originalReq.url } -> 404`)
        originalRes.statusCode = 404
        originalRes.end()
        return
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
}

http
  .createServer(onRequest)
  .listen(config.port, () => {
    logger.log('Server started.')
  })
