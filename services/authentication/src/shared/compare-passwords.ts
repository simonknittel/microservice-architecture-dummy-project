import * as bcrypt from 'bcrypt'

export default async function comparePasswords(raw: string, encrypted: string) {
  return bcrypt.compare(raw, encrypted)
}
