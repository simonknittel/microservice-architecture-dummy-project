import { IncomingMessage, ServerResponse } from 'http'
import * as Redis from 'ioredis'
import config from '../config'
import logger from '../logger'

const redis = new Redis({
  host: config.redisHost,
  port: config.redisPort,
  password: config.redisPassword,
})

export default function rateLimit(req: IncomingMessage, res: ServerResponse) {
  return new Promise<void>(resolve => {
    const ip = getIp(req)

    let redisKey = ip

    const serviceName = req.url.split('/')[1]
    let timeframeStart = Date.now() - config.defaultRateLimit.timeframe
    let maxRequestsPerTimeframe = config.defaultRateLimit.count

    if (config.services[serviceName]) {
      const service = config.services[serviceName]

      if (service.rateLimit) {
        redisKey += `-${serviceName}`

        timeframeStart = Date.now() - service.rateLimit.timeframe
        maxRequestsPerTimeframe = service.rateLimit.count
      }

      // TODO: Rate limiting per route
      // TODO: Add path to redisKey
    }

    redis
      .get(redisKey)
      .then(data => {
        let requests = []

        if (data) {
          const parsedData = JSON.parse(data)

          // Remove too old requests from list
          requests = parsedData.filter((request: number) => request >= timeframeStart)
        }

        // Add current request to list
        requests.push(Date.now())

        // Keep only the necessary requests in Redis
        if (requests.length > maxRequestsPerTimeframe + 1) requests = requests.slice(1)

        redis
          .set(redisKey, JSON.stringify(requests))
          .then(() => {}) // Doesn't need to block the response therefore we don't wait
          .catch(error => {
            logger.error(error)
          })

        // Max X requests in timeframe
        if (requests.length > maxRequestsPerTimeframe) {
          res.statusCode = 429

          // Time till next request
          const seconds = Math.ceil((requests[0] - timeframeStart) / 1000)
          res.setHeader('Retry-After', seconds)

          res.end()
          return
        }

        resolve()
      })
      .catch(error => {
        logger.error(error)
      })
  })
}

// TODO: More reliable way to retrieve IP address
function getIp(req: IncomingMessage) {
  return (typeof req.headers['x-forwarded-for'] === 'string' && req.headers['x-forwarded-for'].split(',').shift()) || req.connection?.remoteAddress
}
