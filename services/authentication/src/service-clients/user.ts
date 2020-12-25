import * as http from 'http'
import logger from '../logger'

class UserServiceClient {
  get({ username, email }) {
    return new Promise<User>((resolve, reject) => {
      const searchParams = new URLSearchParams()
      if (username) searchParams.append('username', username)
      if (email) searchParams.append('email', email)

      const req = http.request(`http://localhost:3001/get?${searchParams.toString()}`, res => {
        if (res.statusCode !== 200) {
          logger.error(res.statusCode)
          return reject()
        }

        res.setEncoding('utf8')
        let rawData = ''
        res.on('data', chunk => { rawData += chunk })
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData)
            resolve(parsedData[0])
          } catch (error) {
            logger.error(error)
          }
        })
      })

      req.on('error', (error) => {
        logger.error(error)
        reject()
      })

      req.end()
    })
  }

  create({username, password, email}) {
    return new Promise<void>((resolve, reject) => {
      const url = 'http://localhost:3001/create'

      const postData: any = {}
      if (username) postData.username = username
      if (email) postData.email = email
      postData.password = password

      const jsonPostData = JSON.stringify(postData)

      const options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(jsonPostData)
        }
      }

      const req = http.request(url, options, res => {
        if (res.statusCode !== 200) return reject(res.statusCode)
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

const userServiceClient = new UserServiceClient()
export default userServiceClient
