import { Context, Next } from 'koa';
import RefreshToken from '../../models/refresh-token';
import { createAccessToken, createRefreshToken, verifyToken } from '../../shared/jwt-tokens';

export default async function refresh(ctx: Context, next: Next) {
  const refreshToken = ctx.request.body.refreshToken?.trim()

  if (!refreshToken) {
    ctx.response.status = 400
    return next()
  }

  try {
    const result = <Jwt>verifyToken(refreshToken)
    if (!result) throw ''

    const found = await RefreshToken.query().where('token', refreshToken)
    if (!found || found.length === 0) throw ''

    await RefreshToken.query()
      .delete()
      .where('token', refreshToken)

    const payload = { userId: result.userId }
    const newAccessToken = createAccessToken(payload)
    const newRefreshToken = createRefreshToken(payload)

    await RefreshToken.query().insert({
      user_id: result.userId,
      token: newRefreshToken,
      user_agent: ctx.headers['user-agent']
    })

    // TODO: Set cookies
    ctx.response.body = {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    }
  } catch (error) {
    ctx.response.status = 401 // TODO: Correct code?
    console.error(error)
  }
}
