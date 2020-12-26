exports.up = function(knex) {
  return knex.schema.createTable('password_reset_tokens', table => {
    table.increments('id').primary
    table.bigint('created_at')
    table.integer('user_id').unique()
    table.string('token').unique()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('password_reset_tokens')
}
