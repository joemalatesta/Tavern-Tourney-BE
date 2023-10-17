import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as playerCtrl from '../controllers/player.js'

const router = Router()

/*---------- Public Routes ----------*/

router.get('/', playerCtrl.index)
router.get('/:id', playerCtrl.findOne)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, playerCtrl.create)
router.delete('/:id', checkAuth, playerCtrl.delete)
router.put('/:id', checkAuth, playerCtrl.update)
export { router }