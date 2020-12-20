import { Context, Next } from 'koa'
import emailClient from '../clients/email'
import hashPassword from '../shared/hash-password'
import userClient from '../clients/user'
import {v4 as uuidv4} from 'uuid'

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

    await userClient.create({ username, password: hashedPassword, email })

    if (email) {
      const token = uuidv4()

      // TODO: Save token to database

      emailClient.send(email, 'emailVerification', { token })
    }
  } catch (error) {
    ctx.response.status = 400
  }

  next()
}
