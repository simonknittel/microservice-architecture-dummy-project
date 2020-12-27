import * as jwt from 'jsonwebtoken'
import config from '../config'

export function createAccessToken(payload: object) {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtAccessTokenLifetime
  })
}

export function createRefreshToken(payload: object) {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtRefreshTokenLifetime
  })
}

export function verifyToken(token: string) {
  return jwt.verify(token, config.jwtSecret)
}
