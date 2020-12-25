import { Context, Next } from 'koa';
import logger from '../logger';
import User from '../models/user';

export default async function get(ctx: Context, next: Next) {
  const id = ctx.request.query.id?.trim()
  const username = ctx.request.query.username?.trim()
  const email = ctx.request.query.email?.trim()

  if (!id && !username && !email) {
    ctx.response.status = 400
    return next()
  }

  try {
    const query: any = {}
    if (id) query.id = id
    if (username) query.username = username
    if (email) query.email = email

    const foundUser = await User.query().where(query)

    if (foundUser.length === 0) {
      ctx.response.status = 404
    } else {
      ctx.response.body = foundUser
    }
  } catch (error) {
    ctx.response.status = 500
    logger.error(error)
  }

  next()
}
