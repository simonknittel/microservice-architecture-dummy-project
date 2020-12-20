import * as jwt from 'jsonwebtoken'

export function createAccessToken(payload: object) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_LIFETIME
  })
}

export function createRefreshToken(payload: object) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_LIFETIME
  })
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET)
}
