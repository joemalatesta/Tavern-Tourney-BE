import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as matchCtrl from '../controllers/match.js'

const router = Router()

/*---------- Public Routes ----------*/



/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, matchCtrl.create)
router.get('/', checkAuth, matchCtrl.index)


export { router }