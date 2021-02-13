import { Context } from 'koa'
import * as Router from '@koa/router'
import health from './routes/health'
import refresh from './routes/refresh'
import get from './routes/get'

const router = new Router()

router.get('/internal/health', health)
router.get('/internal/refresh', refresh)
router.get('/permissions', get)
router.post('/permissions', (ctx: Context) => ctx.response.status = 501)

export default router
