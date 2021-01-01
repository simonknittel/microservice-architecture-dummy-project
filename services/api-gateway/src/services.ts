import { NormalizedRouteCollection, RouteCollection, Service, ServiceCollection } from './global'
import { request } from 'http'
import logger from './logger'

class Services {
  services: ServiceCollection
  routes: NormalizedRouteCollection

  constructor() {
    setInterval(this.healthCheck.bind(this), 5000)
  }

  healthCheck() {
    for (const [serviceKey, service] of Object.entries(this.services)) {
      const options = { method: 'get' }

      const req = request(`${ service.host }:${ service.port }/internal/health`, options, res => {
        if (res.statusCode !== 204) {
          service.healthy = false
          logger.error(`Unhealthy service: ${ serviceKey }`)
          return
        }
        service.healthy = true
      })

      req.on('error', () => {
        service.healthy = false
        logger.error(`Unhealthy service: ${ serviceKey }`)
      })

      req.end()
    }
  }

  register(serviceKey: string, config: Service, routes: RouteCollection) {
    this.services[serviceKey] = {
      healthy: true,
      ...config
    }

    for (const [routeKey, routeConfig] of Object.entries(routes)) {
      this.routes[routeKey] = {
        serviceKey,
        ...routeConfig
      }
    }

    logger.log(`Service added: ${ serviceKey }`)
  }

  unregister(serviceKey: string) {
    delete this.services[serviceKey]

    for (const [routeKey, route] of Object.entries(this.routes)) {
      if (route.serviceKey !== serviceKey) continue
      delete this.routes[routeKey]
    }

    logger.log(`Service removed: ${ serviceKey }`)
  }
}

const services = new Services()
export default services
