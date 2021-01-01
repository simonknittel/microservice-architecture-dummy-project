import { ServerResponse, IncomingMessage, request, RequestOptions } from 'http'
import getPath from '../shared/get-path'
import logger from '../logger'
import services from '../services'

export default function serviceRouter(originalReq: IncomingMessage, originalRes: ServerResponse) {
  return new Promise<void>((resolve, reject) => {
    const path = getPath(originalReq)

    const route = services.routes[path]
    const service = services.services[route.serviceKey]

    if (service.healthy === false) {
      logger.error('-> not proxying due to an unhealthy service')
      originalRes.statusCode = 500
      originalRes.end()
      return reject(false)
    }

    const options: RequestOptions = {
      method: originalReq.method,
      headers: originalReq.headers,
      host: service.host,
      port: service.port
    }

    const splittedUrl = originalReq.url.split('?')
    options.path =
      (route.path ? route.path : path)
      + (splittedUrl[1] ? `?${ splittedUrl[1]} ` : '')

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
