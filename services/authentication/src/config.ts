// TODO: Integrate configuration service

import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({
  path: path.resolve(__dirname, '../.env')
})

class Config {
  port: number

  jwtSecret: string
  jwtAccessTokenLifetime: number
  jwtRefreshTokenLifetime: number

  emailVerificationTokenMaxAge: number
  passwordResetTokenMaxAge: number

  signupEnabled: boolean
  loginEnabled: boolean

  userServiceHost: string
  emailServiceHost: string

  constructor() {
    this.refresh()
  }

  refresh() {
    return new Promise<void>(resolve => {
      this.port = parseInt(process.env.PORT),

      this.jwtSecret = process.env.JWT_SECRET,
      this.jwtAccessTokenLifetime = parseInt(process.env.JWT_ACCESS_TOKEN_LIFETIME),
      this.jwtRefreshTokenLifetime = parseInt(process.env.JWT_REFRESH_TOKEN_LIFETIME),

      this.emailVerificationTokenMaxAge = parseInt(process.env.EMAIL_VERIFICATION_TOKEN_MAX_AGE),
      this.passwordResetTokenMaxAge = parseInt(process.env.PASSWORD_RESET_TOKEN_MAX_AGE),

      this.signupEnabled = process.env.SIGNUP_ENABLED ? Boolean(process.env.SIGNUP_ENABLED) : true,
      this.loginEnabled = process.env.LOGIN_ENABLED ? Boolean(process.env.LOGIN_ENABLED) : true,

      this.userServiceHost = process.env.USER_SERVICE_HOST,
      this.emailServiceHost = process.env.EMAIL_SERVICE_HOST,

      resolve()
    })
  }
}

const config = new Config()
export default config
