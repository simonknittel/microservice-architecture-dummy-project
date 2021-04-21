// TODO: Integrate configuration service

import { RateLimitConfig } from './global'
import { Secret } from 'jsonwebtoken'

class Config {
  port: number

  redisHost: string
  redisPort: number
  redisPassword: string

  defaultRateLimit: RateLimitConfig

  jwtSecret: Secret

  constructor() {
    this.refresh()
  }

  refresh() {
    return new Promise<void>(resolve => {
      this.port = parseInt(process.env.PORT) || 3000

      this.redisHost = process.env.REDIS_HOST || 'localhost'
      this.redisPort = parseInt(process.env.REDIS_PORT) || 6379
      this.redisPassword = process.env.REDIS_PASSWORD

      this.defaultRateLimit = {
        timeframe: 1000 * 60, // 1 minute
        count: 10,
      }

      this.jwtSecret = process.env.JWT_SECRET

      resolve()
    })
  }
}

const config = new Config()
export default config
