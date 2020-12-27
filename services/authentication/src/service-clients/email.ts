import * as http from 'http'
import config from '../config'

class EmailServiceClient {
  send(to: string, template: string, variables?: object) {
    return new Promise<void>((resolve, reject) => {
      const postData: any = {}
      postData.to = to
      postData.template = template
      postData.variables = variables

      const jsonPostData = JSON.stringify(postData)

      const options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(jsonPostData)
        }
      }

      const req = http.request(`${ config.emailServiceHost }/send`, options, res => {
        if (res.statusCode !== 204) return reject(res.statusCode)
        resolve()
      })

      req.on('error', error => {
        reject(error)
      })

      req.write(jsonPostData)
      req.end()
    })
  }
}

const emailServiceClient = new EmailServiceClient()
export default emailServiceClient
