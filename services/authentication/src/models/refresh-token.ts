import { Model } from 'objection';

export default class RefreshToken extends Model {
  id!: number
  user_id!: number
  token!: string
  user_agent?: string

  static tableName = 'refresh_tokens'

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'token'],
      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        token: { type: 'string' },
        user_agent: { type: 'string' }
      }
    }
  }
}
