import { Model } from 'objection';

export default class User extends Model {
  id!: number
  username?: string
  password!: string
  email?: string
  emailVerified?: boolean

  static tableName = 'users'

  static get jsonSchema() {
    return {
      type: 'object',
      required: [ 'password' ],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string' },
        password: { type: 'string' },
        email: { type: 'string' },
        emailVerified: { type: 'boolean' },
      }
    }
  }
}
