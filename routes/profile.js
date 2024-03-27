import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as profileCtrl from '../controllers/profile.js'

const router = Router()

/*---------- Public Routes ----------*/

router.get('/:id', profileCtrl.findOne)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profileCtrl.index)
router.put('/:id', checkAuth, profileCtrl.update)
export { router }
