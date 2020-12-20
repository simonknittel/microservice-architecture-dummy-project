import * as Knex from 'knex'
import { Model } from 'objection'
import knexfile from './knexfile'

const knex = Knex(knexfile)

Model.knex(knex)
