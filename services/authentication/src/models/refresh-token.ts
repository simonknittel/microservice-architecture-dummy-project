import { Model } from 'objection';

export default class RefreshToken extends Model {
  static get tableName() {
    return 'refresh_tokens'
  }
}
