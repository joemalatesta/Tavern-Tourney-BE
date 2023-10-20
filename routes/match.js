import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as matchCtrl from '../controllers/match.js'

const router = Router()

/*---------- Public Routes ----------*/


router.get('/', matchCtrl.index)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, matchCtrl.create)
router.put('/:id', checkAuth, matchCtrl.update)

export { router }