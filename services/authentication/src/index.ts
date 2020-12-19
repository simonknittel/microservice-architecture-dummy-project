import * as Koa from 'koa'
import * as Router from '@koa/router'

const app = new Koa()
const router = new Router()

router.get('/health', (ctx: Koa.Context, next: Koa.Next) => {
  ctx.response.status = 200
  next()
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000, () => {
    console.log('Server started.')
  })
