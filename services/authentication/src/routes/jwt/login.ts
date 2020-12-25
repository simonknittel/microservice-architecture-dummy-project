import { Context, Next } from 'koa'
import { createAccessToken, createRefreshToken } from '../../shared/jwt-tokens'
import comparePasswords from '../../shared/compare-passwords'
import userServiceClient from '../../service-clients/user'
import RefreshToken from '../../models/refresh-token'

export default async function login(ctx: Context, next: Next) {
  // TODO: Check if login is enabled

  const username = ctx.request.body.username?.trim()
  const email = ctx.request.body.email?.trim()
  const password = ctx.request.body.password?.trim()

  if ((!username && !email) || !password) {
    ctx.response.status = 400
    return next()
  }

  try {
    const user = await userServiceClient.get({ username, email })

    const result = await comparePasswords(password, user.password)
    if (!result) throw ''

    // TODO: Check if user is allowed to login
    // TODO: Check if 2fa is required
    // TODO: Validate 2fa

    const payload = { userId: user.id }
    const accessToken = createAccessToken(payload)
    const refreshToken = createRefreshToken(payload)

    await RefreshToken.query().insert({
      user_id: user.id,
      token: refreshToken,
      user_agent: ctx.headers['user-agent']
    })

    // TODO: Set cookies
    ctx.response.body = {
      accessToken,
      refreshToken
    }
  } catch (error) {
    // TODO: Differentiate between 5xx and 401
    ctx.response.status = 401
    console.error(error)
  }

  next()
}
