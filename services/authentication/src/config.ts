// TODO: Integrate configuration service

require('dotenv').config()

class Config {
  store: {
    port: number

    jwtSecret: string
    jwtAccessTokenLifetime: number
    jwtRefreshTokenLifetime: number

    databaseHost: string
    databaseUser: string
    databasePassword: string
    databaseName: string
  }

  constructor() {
    this.refresh()
  }

  refresh() {
    return new Promise<void>(resolve => {
      this.store = {
        port: parseInt(process.env.PORT),

        jwtSecret: process.env.JWT_SECRET,
        jwtAccessTokenLifetime: parseInt(process.env.JWT_ACCESS_TOKEN_LIFETIME),
        jwtRefreshTokenLifetime: parseInt(process.env.JWT_REFRESH_TOKEN_LIFETIME),

        databaseHost: process.env.DATABASE_HOST,
        databaseUser: process.env.DATABASE_USER,
        databasePassword: process.env.DATABASE_PASSWORD,
        databaseName: process.env.DATABASE_NAME
      }

      resolve()
    })
  }

  get(key: string) {
    return this.store[key]
  }
}

const config = new Config()
export default config
