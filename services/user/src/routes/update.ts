import { Context, Next } from 'koa'
import User from '../models/user'

export default async function update(ctx: Context, next: Next) {
  const userId = ctx.params.userId?.trim()
  const username = ctx.request.body.username?.trim()
  const password = ctx.request.body.password?.trim()
  const email = ctx.request.body.email?.trim()
  const emailVerified = ctx.request.body.emailVerified

  if (!userId) {
    ctx.response.status = 400
    return await next()
  }

  if (!username && !email && !password && !(emailVerified === true || emailVerified === false)) {
    ctx.response.status = 400
    return await next()
  }

  try {
    const patch: any = {}
    if (username) patch.username = username
    if (password) patch.password = password
    if (email) {
      patch.email = email
      patch.email_verified = false
    }
    if (emailVerified === true || emailVerified === false) patch.email_verified = emailVerified

    await User.query().where({ id: userId }).patch(patch)

    ctx.response.status = 204
    return await next()
  } catch (error) {
    ctx.response.status = 500
    return await next()
  }
}
