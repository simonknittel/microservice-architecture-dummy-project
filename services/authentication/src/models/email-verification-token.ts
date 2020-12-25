import { Model } from 'objection';

export default class EmailVerificationToken extends Model {
  id!: number
  created_at!: number
  user_id!: number
  token!: string

  static tableName = 'email_verification_tokens'

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['created_at', 'user_id', 'token'],
      properties: {
        id: { type: 'integer' },
        created_at: { type: 'bigint' },
        user_id: { type: 'integer' },
        token: { type: 'string' },
      }
    }
  }
}
