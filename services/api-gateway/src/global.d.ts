import { IncomingMessage } from 'http'

interface Service {
  host: string
  port: number

  healthy: boolean

  rateLimit?: RateLimitConfig
  authentication?: AuthenticationConfig
}

type ServiceCollection = Record<string, Service>

interface Route {
  path?: string
  rateLimit?: RateLimitConfig
  authentication?: AuthenticationConfig
}

type RouteCollection = Record<string, Route>

interface RateLimitConfig {
  timeframe: number
  count: number
}

interface AuthenticationConfig {
  required?: boolean // Only validates access token on request
  strong?: boolean // Also validates refresh token on request
}

interface IM extends IncomingMessage {
  user?: any
}

interface NormalizedRoute extends Route {
  serviceKey: string
}

type NormalizedRouteCollection = Record<string, NormalizedRoute>
