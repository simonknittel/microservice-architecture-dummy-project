import * as mockUsers from './mock-users.json'

// TODO: Build up the actual user service and use that

class UserClient {
  users: UserCollection

  constructor() {
    this.users = mockUsers
  }

  findOne({ username, email }) {
    return new Promise<User>((resolve, reject) => {
      let result: User = null

      for (const [id, user] of Object.entries(this.users)) {
        if (
          user.username === username
          || user.email === email
        ) {
          result = user
          break
        }
      }

      if (!result) return reject()
      resolve(result)
    })
  }

  create({username, password, email}) {
    return new Promise<void>((resolve) => {
      const id = Object.entries(this.users).length

      this.users[id] = {
        id,
        username,
        password,
        email
      }

      resolve()
    })
  }
}

const userClient = new UserClient()
export default userClient
