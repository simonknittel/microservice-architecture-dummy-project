import * as http from 'http'

class EmailServiceClient {
  url: string

  constructor() {
    this.url = 'http://localhost:3002'
  }

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

      const req = http.request(`${this.url}/send`, options, res => {
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
