import { Context, Next } from "koa"

export default function health(ctx: Context, next: Next) {
  ctx.response.status = 200
  next()
}
