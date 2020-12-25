import { Context, Next } from 'koa'
import {v4 as uuidv4} from 'uuid'
import emailServiceClient from '../service-clients/email'
import EmailVerificationToken from '../models/email-verification-token'
import hashPassword from '../shared/hash-password'
import logger from '../logger'
import userServiceClient from '../service-clients/user'

export default async function(ctx: Context, next: Next) {
  // TODO: Check if signup is enabled

  const username = ctx.request.body.username?.trim()
  const email = ctx.request.body.email?.trim()
  const password = ctx.request.body.password?.trim()

  if ((!username && !email) || !password) {
    ctx.response.status = 400
    return await next()
  }

  // TODO: Verify minimum password requirements
  // TODO: Verify if provided email address is valid

  try {
    const hashedPassword = await hashPassword(password)

    const createdUser = await userServiceClient.create({ username, password: hashedPassword, email })

    if (email) {
      const token = uuidv4()

      await EmailVerificationToken.query().insert({
        user_id: createdUser.id,
        created_at: Date.now(),
        token
      })

      await emailServiceClient.send(email, 'emailVerification', { token })
    }

    ctx.response.status = 204
    return await next()
  } catch (error) {
    if (error === 409) { // Prevent information disclosure if user already exists
      ctx.response.status = 400
      return await next()
    } else if (error >= 400 && error < 500) {
      logger.error(error)
      ctx.response.status = 400
      return await next()
    } else {
      logger.error(error)
      ctx.response.status = 500
      return await next()
    }
  }
}
