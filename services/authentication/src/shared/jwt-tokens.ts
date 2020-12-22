import * as jwt from 'jsonwebtoken'
import config from '../config'

export function createAccessToken(payload: object) {
  return jwt.sign(payload, config.get('jwtSecret'), {
    expiresIn: config.get('jwtAccessTokenLifetime')
  })
}

export function createRefreshToken(payload: object) {
  return jwt.sign(payload, config.get('jwtSecret'), {
    expiresIn: config.get('jwtRefreshTokenLifetime')
  })
}

export function verifyToken(token: string) {
  return jwt.verify(token, config.get('jwtSecret'))
}
