import * as Router from '@koa/router'
import jwtLogin from './routes/jwt/login'
import health from './routes/health'
import signup from './routes/signup'
import jwtRefresh from './routes/jwt/refresh'
import refreshConfig from './routes/refresh'

const router = new Router()

router.get('/health', health)
router.get('/refresh', refreshConfig)
router.post('/jwt/login', jwtLogin)
router.post('/jwt/refresh', jwtRefresh)
router.post('/signup', signup)

export default router
