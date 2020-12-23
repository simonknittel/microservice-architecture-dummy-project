import * as Knex from 'knex'
import { Model } from 'objection'
import * as knexfile from './knexfile.js'

const knex = Knex(knexfile)

Model.knex(knex)
