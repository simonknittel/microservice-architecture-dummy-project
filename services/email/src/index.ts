import * as bodyParser from 'koa-bodyparser'
import * as Koa from 'koa'
import config from './config'
import commonLogFormat from './middleware/commonLogFormat'
import logger from './logger'
import router from './router'

new Koa()
  .use(commonLogFormat)
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(config.port, () => {
    logger.log(`Listening on port ${ config.port }`)
  })
