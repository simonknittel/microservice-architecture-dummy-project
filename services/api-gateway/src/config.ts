// TODO: Integrate configuration service

import { NormalizedRouteCollection, RateLimitConfig, Service, ServiceCollection, RouteCollection } from './global'

class Config {
  port: number

  redisHost: string
  redisPort: number
  redisPassword: string

  defaultRateLimit: RateLimitConfig

  services: ServiceCollection
  routes: NormalizedRouteCollection

  jwtSecret: string

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
      this.routes = {}

      // TODO
      this.registerService('authentication', {
        host: 'authentication_service',
        port: 3000,
      }, {
        '/jwt/login': {},
        '/jwt/refresh': {},
        '/logout': {},
        '/request-password-reset': {},
        '/set-password': {},
        '/signup': {},
        '/verify-email': {},
        '/me': {
          authentication: {
            required: true
          }
        }
      })

      this.jwtSecret = process.env.JWT_SECRET,

      resolve()
    })
  }

  registerService(serviceKey: string, config: Service, routes: RouteCollection) {
    this.services[serviceKey] = config

    for (const [routeKey, routeConfig] of Object.entries(routes)) {
      this.routes[routeKey] = {
        serviceKey,
        routeKey,
        ...routeConfig
      }
    }
  }
}

const config = new Config()
export default config
