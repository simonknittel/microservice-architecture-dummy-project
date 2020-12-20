import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('refresh_tokens', table => {
    table.increments('id').primary
    table.integer('user_id')
    table.string('token')
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('refresh_tokens')
}
