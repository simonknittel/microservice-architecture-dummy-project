// TODO: Integrate configuration service

import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({
  path: path.resolve(__dirname, '../.env')
})

class Config {
  store: {
    port: number

    jwtSecret: string
    jwtAccessTokenLifetime: number
    jwtRefreshTokenLifetime: number
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
