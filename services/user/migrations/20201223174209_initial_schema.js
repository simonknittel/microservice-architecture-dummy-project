exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary
    table.string('username').unique()
    table.string('password')
    table.string('email').unique()
    table.boolean('email_verified')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
}
