import { Context, Next } from 'koa'

export default async function health(ctx: Context, next: Next) {
  ctx.response.status = 204
  await next()
}
