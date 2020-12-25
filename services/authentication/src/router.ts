import * as Router from '@koa/router'
import jwtLogin from './routes/jwt/login'
import health from './routes/health'
import signup from './routes/signup'
import jwtRefresh from './routes/jwt/refresh'
import refreshConfig from './routes/refresh'
import verifyEmail from './routes/verify-email'

const router = new Router()

router.get('/health', health)
router.get('/refresh', refreshConfig)
router.post('/jwt/login', jwtLogin)
router.post('/jwt/refresh', jwtRefresh)
router.post('/jwt/logout', ctx => ctx.response.status = 501)
router.post('/signup', signup)
router.post('/request-password-reset', ctx => ctx.response.status = 501)
router.post('/set-password', ctx => ctx.response.status = 501)
router.get('/verify-email', verifyEmail)

export default router
