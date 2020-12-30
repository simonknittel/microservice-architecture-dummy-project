import './db'
import * as bodyParser from 'koa-bodyparser'
import * as Koa from 'koa'
import serviceRegistry from './service-clients/service-registry'
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

    if (config.serviceRegistryHost) serviceRegistry.register()
  })

process.on('exit', exitHandler)
process.on('SIGINT', exitHandler)
process.on('SIGTERM', exitHandler)
process.on('uncaughtException', exitHandler)

function exitHandler() {
  logger.log('Shutting down')

  if (config.serviceRegistryHost) serviceRegistry.unregister()
}
