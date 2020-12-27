// TODO: Integrate configuration service

import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({
  path: path.resolve(__dirname, '../.env')
})

class Config {
  port: number

  constructor() {
    this.refresh()
  }

  refresh() {
    return new Promise<void>(resolve => {
      this.port = parseInt(process.env.PORT),

      resolve()
    })
  }
}

const config = new Config()
export default config
