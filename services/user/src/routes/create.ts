import { Context, Next } from 'koa';
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

    await User.query().insert(insertObject)

    ctx.response.status = 200
  } catch (error) {
    // TODO: Differentiate between 4xx (e.g. duplicate entry) and 5xx
    ctx.response.status = 500
    console.error(error)
  }

  next()
}
