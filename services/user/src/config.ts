// TODO: Integrate configuration service

import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({
  path: path.resolve(__dirname, '../.env')
})

class Config {
  store: {
    port: number
  }

  constructor() {
    this.refresh()
  }

  refresh() {
    return new Promise<void>(resolve => {
      this.store = {
        port: parseInt(process.env.PORT),
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
