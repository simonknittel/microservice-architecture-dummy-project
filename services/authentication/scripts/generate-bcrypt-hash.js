if (!process.env.PASS) {
  console.error('PASS or ROUNDS missing.')
  return
}

const bcrypt = require('bcrypt')

bcrypt
  .hash(process.env.PASS, 10)
  .then((hash) => {
    console.log(hash)
  })
