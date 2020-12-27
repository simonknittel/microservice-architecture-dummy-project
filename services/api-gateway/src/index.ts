import * as http from 'http'
import config from './config'
import logger from './logger'

function onRequest(originalReq: http.IncomingMessage, originalRes: http.ServerResponse) {
  const options: http.RequestOptions = {
    hostname: 'localhost',
    method: originalReq.method,
    headers: originalReq.headers
  }

  switch (originalReq.url.split('/')[1]) {
    case 'authentication':
      options.port = 3003
      options.path = originalReq.url.replace('/authentication', '')
      break;

    default:
      break;
  }

  logger.log(`Serving: ${ originalReq.method } ${ originalReq.url } -> localhost:${ options.port }${ options.path }`)

  const proxy = http.request(options, (res) => {
    originalRes.writeHead(res.statusCode, res.headers)
    res.pipe(originalRes, {
      end: true
    })
  })

  originalReq.pipe(proxy, {
    end: true
  })
}

http
  .createServer(onRequest)
  .listen(config.port, () => {
    logger.log('Server started.')
  })
