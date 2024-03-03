import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as scheduleCtrl from '../controllers/schedule.js'

const router = Router()

/*---------- Public Routes ----------*/


router.get('/', scheduleCtrl.index)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, scheduleCtrl.create)
router.put('/:id', checkAuth, scheduleCtrl.update)
router.delete('/:id', checkAuth, scheduleCtrl.deleteOne)
export { router }