import { createServer, IncomingMessage, ServerResponse } from 'http'
import authentication from './middleware/authentication'
import config from './config'
import log from './middleware/log'
import logger from './logger'
import rateLimit from './middleware/rate-limit'
import router from './middleware/router'

function onRequest(req: IncomingMessage, res: ServerResponse) {
  // TODO: Check first if route exists

  log(req)
    .then(authentication.bind(null, req, res))
    .then(rateLimit.bind(null, req, res))
    .then(router.bind(null, req, res))
    .catch((error) => {
      console.trace(error)
    })
}

createServer(onRequest)
  .listen(config.port, () => {
    logger.log(`Listening on port ${ config.port }`)
  })
