const path = require('path')

require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
})

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  }
}
