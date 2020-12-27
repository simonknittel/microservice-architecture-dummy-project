import { Context, Next } from 'koa'
import config from '../config'
import emailServiceClient from '../service-clients/email'
import hashPassword from '../shared/hash-password'
import logger from '../logger'
import PasswordResetToken from '../models/password-reset-token'
import RefreshToken from '../models/refresh-token'
import userServiceClient from '../service-clients/user'

export default async function setPassword(ctx: Context, next: Next) {
  const token = ctx.request.body.token?.trim()
  const newPassword = ctx.request.body.new_password?.trim()
  const newPasswordRepeated = ctx.request.body.new_password_repeated?.trim()

  if (!token || !newPassword || !newPasswordRepeated) {
    ctx.response.status = 400
    return await next()
  }

  if (newPassword !== newPasswordRepeated) {
    ctx.response.status = 400
    return await next()
  }

  // TODO: Verify minimum password requirements

  try {
    const foundTokens = await PasswordResetToken.query().where({ token })
    if (foundTokens.length === 0) {
      ctx.response.status = 400
      return await next()
    }

    const foundToken = foundTokens[0]

    // Delete outdated token
    if (Date.now() - foundToken.created_at > config.passwordResetTokenMaxAge) {
      await PasswordResetToken.query().where({ id: foundToken.id }).delete()
      ctx.response.status = 400
      return await next()
    }

    // Save new password to database
    const hashedPassword = await hashPassword(newPassword)
    await userServiceClient.update(foundToken.user_id, { password: hashedPassword })

    // Delete all passwordResetTokens for this user
    await PasswordResetToken.query().where({ user_id: foundToken.user_id }).delete()

    // Delete refresh tokens
    await RefreshToken.query().where({ user_id: foundToken.user_id }).delete()

    // Send success email
    const user = await userServiceClient.get({ id: foundToken.user_id })
    await emailServiceClient.send(user.email, 'newpassword')

    ctx.response.status = 204
    return await next()
  } catch (error) {
    logger.error(error)
    ctx.response.status = 500
    return await next()
  }
}
