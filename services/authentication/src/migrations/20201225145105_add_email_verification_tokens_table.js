exports.up = function(knex) {
  return knex.schema.createTable('email_verification_tokens', table => {
    table.increments('id').primary
    table.bigint('created_at')
    table.integer('user_id').unique()
    table.string('token').unique()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('email_verification_tokens')
}
