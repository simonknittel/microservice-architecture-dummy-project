import { Context, Next } from 'koa'
import emailServiceClient from '../service-clients/email'
import hashPassword from '../shared/hash-password'
import userServiceClient from '../service-clients/user'
import {v4 as uuidv4} from 'uuid'
import logger from '../logger'

export default async function(ctx: Context, next: Next) {
  // TODO: Check if signup is enabled

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

    await userServiceClient.create({ username, password: hashedPassword, email })

    if (email) {
      const token = uuidv4()

      // TODO: Save token to database

      await emailServiceClient.send(email, 'emailVerification', { token })
    }

    ctx.response.status = 200
  } catch (error) {
    if (error === 409) { // Prevent information disclosure if user already exists
      ctx.response.status === 400
    } else if (error >= 400 && error < 500) {
      ctx.response.status = 400
      logger.error(error)
    } else {
      ctx.response.status = 500
      logger.error(error)
    }
  }

  next()
}
