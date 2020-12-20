import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import router from './routes'

import './db'

new Koa()
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(process.env.PORT, () => {
    console.log('Server started.')
  })
