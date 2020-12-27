import * as Router from '@koa/router'
import create from './routes/create'
import get from './routes/get'
import health from './routes/health'
import refreshConfig from './routes/refresh'
import update from './routes/update'

const router = new Router()

router.get('/health', health)
router.get('/refresh', refreshConfig)
router.get('/user/find', get)
router.post('/user', create)
router.patch('/:userId', update)

export default router
