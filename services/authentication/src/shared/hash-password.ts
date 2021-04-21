import * as bcrypt from 'bcrypt'

export default async function hashPassword(password: string) {
  return bcrypt.hash(password, 10)
}
