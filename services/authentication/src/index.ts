import './db'
import * as bodyParser from 'koa-bodyparser'
import * as Koa from 'koa'
import config from './config'
import router from './router'
import logger from './logger'

new Koa()
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(config.get('port'), () => {
    logger.log('Server started.')
  })
