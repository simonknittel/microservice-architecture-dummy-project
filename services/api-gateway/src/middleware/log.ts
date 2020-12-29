import { IncomingMessage } from 'http'
import logger from '../logger'

export default function log(req: IncomingMessage) {
  return new Promise<void>(resolve => {
    logger.log(`Serving ${ req.method } ${ req.url }`)

    resolve()
  })
}
