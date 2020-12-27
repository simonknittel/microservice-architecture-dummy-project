// TODO: Integrate configuration service

import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({
  path: path.resolve(__dirname, '../.env')
})

class Config {
  port: number

  redisHost: string
  redisPort: number
  redisPassword: string

  constructor() {
    this.refresh()
  }

  refresh() {
    return new Promise<void>(resolve => {
      this.port = parseInt(process.env.PORT)

      this.redisHost = process.env.REDIS_HOST
      this.redisPort = parseInt(process.env.REDIS_PORT)
      this.redisPassword = process.env.REDITS_PASSWORD

      resolve()
    })
  }
}

const config = new Config()
export default config
