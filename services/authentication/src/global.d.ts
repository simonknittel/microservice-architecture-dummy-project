interface User {
  id: number,
  username?: string
  password: string
  email?: string
  emailVerified?: boolean
}

interface Jwt {
  userId: number
  iat: number
  exp: number
}
