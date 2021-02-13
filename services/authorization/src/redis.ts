import * as Redis from 'ioredis'
import config from './config'

const userPermissions = new Redis({
  host: config.redisHost,
  port: config.redisPort,
  password: config.redisPassword,
  db: 0
})

const roles = new Redis({
  host: config.redisHost,
  port: config.redisPort,
  password: config.redisPassword,
  db: 1
})

export { userPermissions, roles }
