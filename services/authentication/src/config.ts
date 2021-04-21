// TODO: Integrate configuration service

import { Secret } from 'jsonwebtoken'

class Config {
  port: number

  jwtSecret: Secret
  jwtAccessTokenLifetime: number
  jwtRefreshTokenLifetime: number

  databaseHost: string
  databasePort: number
  databaseUser: string
  databasePassword: string
  databaseName: string

  emailVerificationTokenMaxAge: number
  passwordResetTokenMaxAge: number

  signupEnabled: boolean
  loginEnabled: boolean

  authenticationServiceHost: string
  userServiceHost: string
  emailServiceHost: string
  serviceRegistryHost: string

  constructor() {
    this.refresh()
  }

  refresh() {
    return new Promise<void>(resolve => {
      this.port = parseInt(process.env.PORT) || 3000

      this.jwtSecret = process.env.JWT_SECRET
      this.jwtAccessTokenLifetime = parseInt(process.env.JWT_ACCESS_TOKEN_LIFETIME) || 900 // 15 minutes
      this.jwtRefreshTokenLifetime = parseInt(process.env.JWT_REFRESH_TOKEN_LIFETIME) || 2678400 // 31 days

      this.databaseHost = process.env.DATABASE_HOST || 'localhost'
      this.databasePort = parseInt(process.env.DATABASE_PORT) || 5432
      this.databaseUser = process.env.DATABASE_USER
      this.databasePassword = process.env.DATABASE_PASSWORD
      this.databaseName = process.env.DATABASE_NAME

      this.emailVerificationTokenMaxAge = parseInt(process.env.EMAIL_VERIFICATION_TOKEN_MAX_AGE) || 300000
      this.passwordResetTokenMaxAge = parseInt(process.env.PASSWORD_RESET_TOKEN_MAX_AGE) || 300000

      this.signupEnabled = process.env.SIGNUP_ENABLED ? Boolean(process.env.SIGNUP_ENABLED) : true
      this.loginEnabled = process.env.LOGIN_ENABLED ? Boolean(process.env.LOGIN_ENABLED) : true

      this.authenticationServiceHost = process.env.AUTHENTICATION_SERVICE_HOST
      this.userServiceHost = process.env.USER_SERVICE_HOST
      this.emailServiceHost = process.env.EMAIL_SERVICE_HOST
      this.serviceRegistryHost = process.env.SERVICE_REGISTRY_HOST

      resolve()
    })
  }
}

const config = new Config()
export default config
