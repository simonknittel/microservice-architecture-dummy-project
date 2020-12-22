exports.up = function(knex) {
  return knex.schema.table('refresh_tokens', table => {
    table.string('user_agent')
  })
}

exports.down = function(knex) {
  return knex.schema.table('refresh_tokens', table => {
    table.dropColumn('user_agent')
  })
}
