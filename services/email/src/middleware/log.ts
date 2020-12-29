import { Context, Next } from 'koa'
import logger from '../logger'

export default async function log(ctx: Context, next: Next) {
  logger.log(`Serving ${ ctx.request.method } ${ ctx.request.URL }`)
  await next()
}
