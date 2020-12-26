// TODO: Integrate configuration service

import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({
  path: path.resolve(__dirname, '../.env')
})

class Config {
  store: {
    port: number

    mailgunHost: string
    mailgunDomain: string
    mailgunKey: string
    mailgunFrom: string
  }

  constructor() {
    this.refresh()
  }

  refresh() {
    return new Promise<void>(resolve => {
      this.store = {
        port: parseInt(process.env.PORT),

        mailgunHost: process.env.MAILGUN_HOST,
        mailgunDomain: process.env.MAILGUN_DOMAIN,
        mailgunKey: process.env.MAILGUN_KEY,
        mailgunFrom: process.env.MAILGUN_FROM,
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
