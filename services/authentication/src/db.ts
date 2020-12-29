import { Model } from 'objection'
import * as Knex from 'knex'
import config from './config'

const knex = Knex({
  client: 'pg',
  connection: {
    host: config.databaseHost,
    port: config.databasePort,
    user: config.databaseUser,
    password: config.databasePassword,
    database: config.databaseName,
  }
})

Model.knex(knex)
