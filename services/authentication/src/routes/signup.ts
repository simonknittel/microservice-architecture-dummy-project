import { Context, Next } from 'koa'
import {v4 as uuidv4} from 'uuid'
import emailServiceClient from '../service-clients/email'
import EmailVerificationToken from '../models/email-verification-token'
import hashPassword from '../shared/hash-password'
import logger from '../logger'
import userServiceClient from '../service-clients/user'
import config from '../config'

export default async function(ctx: Context, next: Next) {
  if (config.signupEnabled === false) {
    ctx.response.status = 403
    return next()
  }

  const username = ctx.request.body.username?.trim()
  const email = ctx.request.body.email?.trim()
  const password = ctx.request.body.password?.trim()

  if ((!username && !email) || !password) {
    ctx.response.status = 400
    return next()
  }

  // TODO: Verify minimum password requirements
  // TODO: Verify if provided email address is valid

  try {
    const hashedPassword = await hashPassword(password)

    const createdUser = await userServiceClient.create({ username, password: hashedPassword, email })

    // TODO: Does this need to block the response for the user?
    if (email) {
      const token = uuidv4()

      await EmailVerificationToken.query().insert({
        user_id: createdUser.id,
        created_at: Date.now(),
        token
      })

      await emailServiceClient.send(email, 'emailverification', { link: token })
    }

    ctx.response.status = 204
    return next()
  } catch (error) {
    if (error === 409) { // Prevent information disclosure if user already exists
      ctx.response.status = 400
      return next()
    } else if (error >= 400 && error < 500) {
      logger.error(error)
      ctx.response.status = 400
      return next()
    } else {
      logger.error(error)
      ctx.response.status = 500
      return next()
    }
  }
}
