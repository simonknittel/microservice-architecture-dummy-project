import './db'
import * as bodyParser from 'koa-bodyparser'
import * as Koa from 'koa'
import config from './config'
import router from './router'

new Koa()
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(config.get('port'), () => {
    console.log('Server started.')
  })
