import { Context, Next } from 'koa'

export default function health(ctx: Context, next: Next) {
  ctx.response.status = 204
  next()
}
