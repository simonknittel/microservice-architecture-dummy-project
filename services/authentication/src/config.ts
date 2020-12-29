// TODO: Integrate configuration service

class Config {
  port: number

  jwtSecret: string
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

      this.databaseHost = process.env.DATABASE_HOST,
      this.databasePort = parseInt(process.env.DATABASE_PORT),
      this.databaseUser = process.env.DATABASE_USER,
      this.databasePassword = process.env.DATABASE_PASSWORD,
      this.databaseName = process.env.DATABASE_NAME,

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
