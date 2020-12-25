import { Context, Next } from 'koa';
import config from '../config';

export default async function refreshConfig(ctx: Context, next: Next) {
  try {
    await config.refresh()
    ctx.response.status = 204
  } catch (error) {
    console.error(error)
    ctx.response.status = 500
  }

  await next()
}
