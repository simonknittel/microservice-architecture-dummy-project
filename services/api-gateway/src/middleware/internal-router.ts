import { register, unregister } from '../internal-routes/services'
import { ServerResponse, IncomingMessage } from 'http'
import getPath from '../shared/get-path'
import health from '../internal-routes/health'

// TODO: Prevent requests from outside
export default function internalRouter(req: IncomingMessage, res: ServerResponse) {
  return new Promise<void>((resolve, reject) => {
    const path = getPath(req)

    if (path === '/internal/services' && req.method === 'POST') {
      return register(req, res)
        .then(() => reject(false))
    } else if (path.indexOf('/internal/services/') === 0 && req.method === 'DELETE') {
      return unregister(req, res)
        .then(() => reject(false))
    } else if (path === '/internal/health' && req.method === 'GET') {
      return health(req, res)
        .then(() => reject(false))
    }

    resolve()
  })
}
