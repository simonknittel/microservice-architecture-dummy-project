import { IncomingMessage, ServerResponse } from 'http'

export default function health(req: IncomingMessage, res: ServerResponse) {
  return new Promise<void>(resolve => {
    res.statusCode = 204
    res.end()
    resolve()
  })
}
