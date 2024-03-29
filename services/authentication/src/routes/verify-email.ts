import { Context, Next } from 'koa'
import config from '../config'
import EmailVerificationToken from '../models/email-verification-token'
import userServiceClient from '../service-clients/user'

export default async function verifyEmail(ctx: Context, next: Next) {
  const token = ctx.request.query.token?.trim()

  if (!token) {
    ctx.response.status = 400
    return next()
  }

  try {
    const foundTokens = await EmailVerificationToken.query().where({ token })
    if (foundTokens.length === 0) {
      ctx.response.status = 400
      return next()
    }

    const foundToken = foundTokens[0]

    // Delete outdated token
    if (Date.now() - foundToken.created_at > config.emailVerificationTokenMaxAge) {
      // TODO: Does this need to block the response for the user?
      await EmailVerificationToken.query().where({ id: foundToken.id }).delete()

      ctx.response.status = 400
      return next()
    }

    // Save email verification to database
    await userServiceClient.update(foundToken.user_id, { emailVerified: true })

    // Delete all emailVerificationTokens for this user
    // TODO: Does this need to block the response for the user?
    await EmailVerificationToken.query().where({ user_id: foundToken.user_id }).delete()

    ctx.response.status = 204
    return next()
  } catch (error) {
    ctx.response.status = 500
    return next()
  }
}
