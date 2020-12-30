import * as http from 'http'
import config from '../config'
import logger from '../logger'

class ServiceRegistry {
  registered: boolean
  heartbeatInterval: NodeJS.Timeout

  register() {
    return new Promise<void>(resolve => {
      const postData: any = {}

      postData.serviceKey = 'authentication'

      postData.config = {
        host: 'authentication_service',
        port: 3000
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

        this.heartbeatInterval = setInterval(this.heartbeat, 5000)
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
        clearInterval(this.heartbeatInterval)
        resolve()
      })

      req.on('error', error => reject(error))

      req.end()
    })
  }

  heartbeat() {
    const options = {
      method: 'get'
    }

    const req = http.request(`${ config.serviceRegistryHost }/internal/services/authentication/heartbeat`, options, res => {
      if (res.statusCode !== 204) logger.error(res.statusCode)
    })

    req.on('error', error => logger.error(error))

    req.end()
  }
}

const serviceRegistry = new ServiceRegistry()
export default serviceRegistry
