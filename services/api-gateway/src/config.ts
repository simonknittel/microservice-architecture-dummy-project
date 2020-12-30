// TODO: Integrate configuration service

import { NormalizedRouteCollection, RateLimitConfig, Service, ServiceCollection, RouteCollection } from './global'
import { Secret } from 'jsonwebtoken'

class Config {
  port: number

  redisHost: string
  redisPort: number
  redisPassword: string

  defaultRateLimit: RateLimitConfig

  services: ServiceCollection
  routes: NormalizedRouteCollection

  jwtSecret: Secret

  constructor() {
    this.refresh()
  }

  refresh() {
    return new Promise<void>(resolve => {
      this.port = parseInt(process.env.PORT)

      this.redisHost = process.env.REDIS_HOST
      this.redisPort = parseInt(process.env.REDIS_PORT)
      this.redisPassword = process.env.REDIS_PASSWORD

      this.defaultRateLimit = {
        timeframe: 1000 * 60, // 1 minute
        count: 10,
      }

      this.services = {}
      this.routes = {}

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

    console.log(`${ serviceKey } registered`)
  }

  unregisterService(serviceKey: string) {
    delete this.services[serviceKey]

    for (const [routeKey, route] of Object.entries(this.routes)) {
      if (route.serviceKey !== serviceKey) continue
      delete this.routes[routeKey]
    }

    console.log(`${ serviceKey } unregistered`)
  }
}

const config = new Config()
export default config
