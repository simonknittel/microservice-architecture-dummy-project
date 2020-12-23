interface User {
  id: number,
  username?: string
  password: string
  email?: string
  emailVerified?: boolean
}

type UserCollection = Record<User['id'], User>

interface Jwt {
  userId: number
  iat: number
  exp: number
}
