import * as http from 'http'
import config from '../config'

class UserServiceClient {
  get({ id, username, email }: { id?: number, username?: string, email?: string}) {
    return new Promise<User>((resolve, reject) => {
      const searchParams = new URLSearchParams()
      if (id) searchParams.append('id', id.toString())
      if (username) searchParams.append('username', username)
      if (email) searchParams.append('email', email)

      const req = http.request(`${ config.userServiceHost }/users/find?${searchParams.toString()}`, res => {
        if (res.statusCode !== 200) {
          return reject(res.statusCode)
        }

        res.setEncoding('utf8')
        let rawData = ''
        res.on('data', chunk => { rawData += chunk })
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData)
            resolve(parsedData[0])
          } catch (error) {
            reject(error)
          }
        })
      })

      req.on('error', (error) => {
        reject(error)
      })

      req.end()
    })
  }

  create({ username, password, email }) {
    return new Promise<User>((resolve, reject) => {
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

      const req = http.request(`${ config.userServiceHost }/users`, options, res => {
        if (res.statusCode !== 201) return reject(res.statusCode)

        res.setEncoding('utf8')
        let rawData = ''
        res.on('data', chunk => { rawData += chunk })
        res.on('end', () => {
          const parsedData = JSON.parse(rawData)
          resolve(parsedData)
        })
      })

      req.on('error', error => {
        reject(error)
      })

      req.write(jsonPostData)
      req.end()
    })
  }

  update(userId: number, payload) {
    return new Promise<void>((resolve, reject) => {
      const postData = payload

      const jsonPostData = JSON.stringify(postData)

      const options = {
        method: 'patch',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(jsonPostData)
        }
      }

      const req = http.request(`${ config.userServiceHost }/users/${userId}`, options, res => {
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

const userServiceClient = new UserServiceClient()
export default userServiceClient
