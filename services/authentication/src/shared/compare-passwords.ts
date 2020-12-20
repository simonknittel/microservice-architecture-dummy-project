import * as bcrypt from 'bcrypt'

export default async function comparePasswords(raw: string, encrypted: string) {
  return await bcrypt.compare(raw, encrypted)
}
