import { Context, Next } from 'koa'
import logger from '../logger'
import { userPermissions } from '../redis'

export default async function(ctx: Context, next: Next) {
  const userId = ctx.request.query.userId?.trim()

  if (!userId) {
    ctx.response.status = 400
    return await next()
  }

  const redisKey = userId

  try {
    const rawJson = await userPermissions.get(redisKey)

    const roles = []
    const individual = []

    if (rawJson) {
      const parsedData = JSON.parse(rawJson)
      roles.push(...parsedData.roles)
      individual.push(...parsedData.individual)
    }

    const nettoPermissions = []

    ctx.response.body = {
      roles,
      individual,
      nettoPermissions
    }

    ctx.response.status = 200
    return await next()

  } catch (error) {
    logger.error(error)
    ctx.response.status = 500
    return await next()
  }
}
