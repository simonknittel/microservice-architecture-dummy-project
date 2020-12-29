import { ServerResponse, IncomingMessage, request, RequestOptions } from 'http'
import config from '../config'
import logger from '../logger'
import getPath from '../shared/get-path'

export default function router(originalReq: IncomingMessage, originalRes: ServerResponse) {
  return new Promise<void>(resolve => {
    const options: RequestOptions = {
      method: originalReq.method,
      headers: originalReq.headers
    }

    const path = getPath(originalReq)

    const route = config.routes[path]
    const service = config.services[route.serviceKey]

    if (service) {
      options.host = service.host
      options.port = service.port

      const splittedUrl = originalReq.url.split('?')
      options.path =
        (route.path ? route.path : path)
        + (splittedUrl[1] ? `?${ splittedUrl[1]} ` : '')
    } else {
      logger.log(`Serving: ${ originalReq.method } ${ originalReq.url } -> 404`)
      originalRes.statusCode = 404
      originalRes.end()
      return
    }

    logger.log(`-> ${ options.host }:${ options.port }${ options.path }`)

    const proxy = request(options, res => {
      originalRes.writeHead(res.statusCode, res.headers)
      res.pipe(originalRes, {
        end: true
      })
    })

    originalReq.pipe(proxy, {
      end: true
    })

    resolve()
  })
}
