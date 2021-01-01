import { createServer, IncomingMessage, ServerResponse } from 'http'
import authentication from './middleware/authentication'
import config from './config'
import internalRouter from './middleware/internal-router'
import log from './middleware/log'
import logger from './logger'
import rateLimit from './middleware/rate-limit'
import serviceRouter from './middleware/service-router'
import filter from './middleware/filter'

function onRequest(req: IncomingMessage, res: ServerResponse) {
  log(req)
    .then(internalRouter.bind(null, req, res))
    .then(filter.bind(null, req, res))
    .then(authentication.bind(null, req, res))
    .then(rateLimit.bind(null, req, res))
    .then(serviceRouter.bind(null, req, res))
    .catch(error => {
      if (error !== false) {
        console.trace(error)
      }
    })
}

createServer(onRequest)
  .listen(config.port, () => {
    logger.log(`Listening on port ${ config.port }`)
  })
