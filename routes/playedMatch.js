import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as playedMatchCtrl from '../controllers/playedMatch.js'

const router = Router()

/*---------- Public Routes ----------*/

router.get('/', playedMatchCtrl.index)
router.get('/:id', playedMatchCtrl.findOne)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, playedMatchCtrl.create)
router.delete('/:id', checkAuth, playedMatchCtrl.delete)
router.put('/:id', playedMatchCtrl.update)
export { router }