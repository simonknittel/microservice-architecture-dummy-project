interface ServiceConfig {
  host: string
  port: number
  rateLimit?: RateLimitConfig
  routes: ServiceRouteConfigCollection
}

type ServiceConfigCollection = Record<string, ServiceConfig>

interface ServiceRouteConfig {
  rateLimit?: RateLimitConfig
}

type ServiceRouteConfigCollection = Record<string, ServiceRouteConfig>

interface RateLimitConfig {
  timeframe: number
  count: number
}
