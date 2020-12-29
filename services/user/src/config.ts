// TODO: Integrate configuration service

class Config {
  port: number

  databaseHost: string
  databasePort: number
  databaseUser: string
  databasePassword: string
  databaseName: string

  constructor() {
    this.refresh()
  }

  refresh() {
    return new Promise<void>(resolve => {
      this.port = parseInt(process.env.PORT),

      this.databaseHost = process.env.DATABASE_HOST,
      this.databasePort = parseInt(process.env.DATABASE_PORT),
      this.databaseUser = process.env.DATABASE_USER,
      this.databasePassword = process.env.DATABASE_PASSWORD,
      this.databaseName = process.env.DATABASE_NAME,

      resolve()
    })
  }
}

const config = new Config()
export default config
