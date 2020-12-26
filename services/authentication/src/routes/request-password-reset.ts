import { Next } from 'koa';
import { Context } from 'koa';
import logger from '../logger';
import userServiceClient from '../service-clients/user';
import {v4 as uuidv4} from 'uuid'
import PasswordResetToken from '../models/password-reset-token';
import emailServiceClient from '../service-clients/email';

export default async function requestPasswordReset(ctx: Context, next: Next) {
  const email = ctx.request.body.email?.trim()

  if (!email) {
    ctx.response.status = 400
    return await next()
  }

  try {
    const foundUser = await userServiceClient.get({ email })

    /**
     * No user with matching email found but respond with success to prevent
     * information disclosure.
     */
    if (!foundUser) {
      ctx.respone.status = 204
      return await next()
    }

    const token = uuidv4()

    await PasswordResetToken.query().where({
      user_id: foundUser.id
    }).delete()

    await PasswordResetToken.query().insert({
      user_id: foundUser.id,
      created_at: Date.now(),
      token
    })

    await emailServiceClient.send(email, 'passwordReset', { token })

    ctx.response.status = 204
    return await next()
  } catch (error) {
    logger.error(error)
    ctx.response.status = 500
    return await next()
  }
}
