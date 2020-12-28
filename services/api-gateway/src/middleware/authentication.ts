import { IM } from '../global'
import { ServerResponse, IncomingMessage } from 'http'
import * as jwt from 'jsonwebtoken'
import config from '../config'
import logger from '../logger'
import getPath from '../shared/get-path'

export default function authentication(req: IM, res: ServerResponse) {
  return new Promise<void>((resolve, reject) => {
    const token = getToken(req)

    if (token) {
      try {
        req.user = jwt.verify(token, config.jwtSecret)
      } catch (error) {
        logger.log(error)
      }
    }

    const authenticationConfig = getConfig(req)

    if (authenticationConfig.required === true && !req.user) {
      res.statusCode = 401
      res.end()
      return reject()
    }

    // if (authenticationConfig.strong === true) {
    //   // TODO: Validate refresh token

    //   if (false) {
    //     res.statusCode = 401
    //     res.end()
    //     return reject()
    //   }
    // }

    resolve()
  })
}

function getToken(req: IncomingMessage) {
  if (
    !req.headers['authorization']
    || req.headers['authorization'].indexOf('Bearer ') !== 0
  ) return null

  return req.headers['authorization'].replace('Bearer ', '')
}

function getConfig(req : IncomingMessage) {
  let required = false
  let strong = false

  ;({ required, strong } = getServiceSpecificConfig(req, required, strong))
  ;({ required, strong } = getRouteSpecificConfig(req, required, strong))

  return {
    required,
    strong
  }
}

function getServiceSpecificConfig(req: IncomingMessage, required: boolean, strong: boolean) {
  const path = getPath(req)

  const serviceKey = config.routes[path].serviceKey
  const service = config.services[serviceKey]

  if (service.authentication) {
    required = service.authentication.required
    if (typeof service.authentication.strong === 'boolean') strong = service.authentication.strong
  }

  return {
    required,
    strong
  }
}

function getRouteSpecificConfig(req: IncomingMessage, required: boolean, strong: boolean) {
  const path = getPath(req)

  const route = config.routes[path]

  if (route.authentication) {
    required = route.authentication.required
    if (typeof route.authentication.strong === 'boolean') strong = route.authentication.strong
  }

  return {
    required,
    strong
  }
}
