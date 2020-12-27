// TODO: Integrate configuration service

import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({
  path: path.resolve(__dirname, '../.env')
})

class Config {
  port: number

  redisHost: string
  redisPort: number
  redisPassword: string

  defaultRateLimit: RateLimitConfig

  services: ServiceConfigCollection

  constructor() {
    this.refresh()
  }

  refresh() {
    return new Promise<void>(resolve => {
      this.port = parseInt(process.env.PORT)

      this.redisHost = process.env.REDIS_HOST
      this.redisPort = parseInt(process.env.REDIS_PORT)
      this.redisPassword = process.env.REDITS_PASSWORD

      this.defaultRateLimit = {
        timeframe: 1000 * 60, // 1 minute
        count: 10,
      }

      this.services = {}

      this.services.authentication = {
        host: 'localhost',
        port: 3003,
        routes: {
          '/jwt/login': {},
          '/jwt/refresh': {},
          '/logout': {},
          '/request-password-reset': {},
          '/set-password': {},
          '/signup': {},
          '/verify-email': {},
        },
      }

      resolve()
    })
  }
}

const config = new Config()
export default config
