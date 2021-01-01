import { IncomingMessage, ServerResponse } from 'http'
import config from '../config'
import getPath from '../shared/get-path'

export default function filter(req: IncomingMessage, res: ServerResponse) {
  return new Promise<void>((resolve, reject) => {
    const path = getPath(req)

    if (!config.routes[path]) {
      res.statusCode = 404
      res.end()
      return reject(false)
    }

    resolve()
  })
}
