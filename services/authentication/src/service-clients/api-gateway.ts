import * as http from 'http'
import config from '../config'

class ApiGateway {
  register() {
    return new Promise<void>((resolve, reject) => {
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

      const req = http.request(`${ config.apiGatewayServiceHost }/internal/services`, options, res => {
        if (res.statusCode !== 201) return reject(res.statusCode)
        resolve()
      })

      req.on('error', error => reject(error))

      req.write(jsonPostData)
      req.end()
    })
  }

  unregister() {
    return new Promise<void>((resolve, reject) => {
      const options = {
        method: 'delete'
      }

      const req = http.request(`${ config.apiGatewayServiceHost }/internal/services/authentication`, options, res => {
        if (res.statusCode !== 202) return reject(res.statusCode)
        resolve()
      })

      req.on('error', error => reject(error))

      req.end()
    })
  }
}

const apiGateway = new ApiGateway()
export default apiGateway
