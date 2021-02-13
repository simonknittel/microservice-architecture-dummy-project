import * as bodyParser from 'koa-bodyparser'
import * as Koa from 'koa'
import config from './config'
import log from './middleware/log'
import logger from './logger'
import router from './router'

new Koa()
  .use(log)
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(config.port, () => {
    logger.log(`Listening on port ${ config.port }`)
  })
