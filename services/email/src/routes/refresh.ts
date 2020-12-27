import { Context, Next } from 'koa';
import config from '../config';
import logger from '../logger';

export default async function refreshConfig(ctx: Context, next: Next) {
  try {
    await config.refresh()
    ctx.response.status = 204
  } catch (error) {
    logger.error(error)
    ctx.response.status = 500
  }

  await next()
}
