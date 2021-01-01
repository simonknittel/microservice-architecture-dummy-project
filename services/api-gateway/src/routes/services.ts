import { IncomingMessage, ServerResponse } from 'http'
import getPath from '../shared/get-path'
import logger from '../logger'
import services from '../services'

export function register(req: IncomingMessage, res: ServerResponse) {
  return new Promise<void>(resolve => {
    req.setEncoding('utf8')
    let rawData = ''
    req.on('data', chunk => { rawData += chunk })
    req.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData)
        services.register(parsedData.serviceKey, parsedData.config, parsedData.routes)
        res.statusCode = 201
      } catch (error) {
        logger.error(error)
        res.statusCode = 400
      }

      res.end()
      resolve()
    })

    req.on('error', error => {
      logger.error(error)
      res.statusCode = 500
      res.end()
      resolve()
    })
  })
}

export function unregister(req: IncomingMessage, res: ServerResponse) {
  return new Promise<void>(resolve => {
    const serviceKey = getPath(req).replace('/internal/services/', '')
    services.unregister(serviceKey)

    res.statusCode = 202
    res.end()
    resolve()
  })
}
