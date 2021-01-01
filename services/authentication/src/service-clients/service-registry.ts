import * as http from 'http'
import config from '../config'
import logger from '../logger'

class ServiceRegistry {
  register() {
    return new Promise<void>(resolve => {
      const postData: any = {}

      postData.serviceKey = 'authentication'

      postData.config = {
        host: config.authenticationServiceHost,
        port: config.port
      }

      postData.routes = {
        '/jwt/login': {},
        '/jwt/refresh': {},
        '/logout': {},
        '/request-password-reset': {},
        '/set-password': {},
        '/signup': {},
        '/verify-email': {},
        '/me': {
          authentication: {
            required: true
          }
        }
      }

      const jsonPostData = JSON.stringify(postData)

      const options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(jsonPostData)
        }
      }

      const req = http.request(`${ config.serviceRegistryHost }/internal/services`, options, res => {
        if (res.statusCode !== 201) {
          setTimeout(this.register.bind(this), 1000)
          logger.error(res.statusCode)
          return resolve()
        }

        resolve()
      })

      req.on('error', error => {
        setTimeout(this.register.bind(this), 1000)
        logger.error(error)
        return resolve()
      })

      req.write(jsonPostData)
      req.end()
    })
  }

  unregister() {
    return new Promise<void>((resolve, reject) => {
      const options = {
        method: 'delete'
      }

      const req = http.request(`${ config.serviceRegistryHost }/internal/services/authentication`, options, res => {
        if (res.statusCode !== 202) return reject(res.statusCode)
        resolve()
      })

      req.on('error', error => reject(error))

      req.end()
    })
  }
}

const serviceRegistry = new ServiceRegistry()
export default serviceRegistry
