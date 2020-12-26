import { Next } from 'koa'
import { Context } from 'koa'
import config from '../config'
import EmailVerificationToken from '../models/email-verification-token'
import userServiceClient from '../service-clients/user'

export default async function verifyEmail(ctx: Context, next: Next) {
  const token = ctx.request.query.token?.trim()

  if (!token) {
    ctx.response.status = 400
    return await next()
  }

  try {
    const foundTokens = await EmailVerificationToken.query().where({ token })
    if (foundTokens.length === 0) {
      ctx.response.status = 400
      return await next()
    }

    const foundToken = foundTokens[0]

    if (Date.now() - foundToken.created_at > config.get('emailVerificationTokenMaxAge')) {
      await EmailVerificationToken.query().where({ id: foundToken.id }).delete()
      ctx.response.status = 400
      return await next()
    }

    await userServiceClient.update(foundToken.user_id, { emailVerified: true })

    await EmailVerificationToken.query().where({ user_id: foundToken.user_id }).delete()

    ctx.response.status = 204
    return await next()
  } catch (error) {
    ctx.response.status = 500
    return await next()
  }
}
