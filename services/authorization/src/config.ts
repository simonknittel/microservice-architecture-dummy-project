// TODO: Integrate configuration service

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
      this.port = parseInt(process.env.PORT) || 3000

      this.redisHost = process.env.REDIS_HOST || 'localhost'
      this.redisPort = parseInt(process.env.REDIS_PORT) || 6379
      this.redisPassword = process.env.REDIS_PASSWORD

      resolve()
    })
  }
}

const config = new Config()
export default config
