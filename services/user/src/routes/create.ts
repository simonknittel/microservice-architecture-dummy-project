import { Context, Next } from 'koa';
import logger from '../logger';
import User from '../models/user';

export default async function create(ctx: Context, next: Next) {
  const username = ctx.request.body.username?.trim()
  const email = ctx.request.body.email?.trim()
  const password = ctx.request.body.password?.trim()

  if ((!username && !email) || !password) {
    ctx.response.status = 400
    return next()
  }

  // TODO: Check if provided username contains forbidden words

  try {
    const insertObject: any = {}

    if (username) insertObject.username = username
    if (email) insertObject.email = email
    insertObject.password = password

    const insertedUser = await User.query().insert(insertObject)

    ctx.response.body = insertedUser
    ctx.response.status = 201
  } catch (error) {
    switch (error.name) {
      case 'UniqueViolationError':
        ctx.response.status = 409
        break;

      default:
        ctx.response.status = 500
        logger.error(error)
        break;
    }
  }

  next()
}
