exports.up = function(knex) {
  return knex.schema.createTable('refresh_tokens', table => {
    table.increments('id').primary
    table.integer('user_id')
    table.string('token').unique()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('refresh_tokens')
}
