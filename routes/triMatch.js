import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as triMatchCtrl from '../controllers/triMatch.js'

const router = Router()

/*---------- Public Routes ----------*/


router.get('/', triMatchCtrl.index)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, triMatchCtrl.create)
router.put('/:id', checkAuth, triMatchCtrl.update)
router.delete('/:id', checkAuth, triMatchCtrl.deleteOne)
export { router }