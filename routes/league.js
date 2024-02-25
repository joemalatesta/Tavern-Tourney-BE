import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as leagueCtrl from '../controllers/league.js'

const router = Router()

/*---------- Public Routes ----------*/


router.get('/', leagueCtrl.index)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, leagueCtrl.create)
router.put('/:id', checkAuth, leagueCtrl.update)
router.delete('/:id', checkAuth, leagueCtrl.deleteOne)
export { router }