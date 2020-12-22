import { Context, Next } from 'koa';
import RefreshToken from '../models/refresh-token';
import { verifyToken } from '../shared/jwt-tokens';

export default async function refresh(ctx: Context, next: Next) {
  const refreshToken = ctx.request.body.refreshToken?.trim()

  if (!refreshToken) {
    ctx.response.status = 400
    return next()
  }

  try {
    const result = verifyToken(refreshToken)
    if (!result) throw ''

    // TODO: Check if refresh token is still valid (compare with database)
    // TODO: Create access token

    await RefreshToken.query()
      .delete()
      .where('token', refreshToken)

    // TODO: Create new refresh token
    // TODO: Save new refresh token to database
    ctx.response.body = {}
  } catch (error) {
    ctx.response.status = 401 // TODO: Correct code?
    console.error(error)
  }
}
