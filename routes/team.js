import { Router } from "express"
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js"
import * as teamCtrl from "../controllers/team.js"

const router = Router()

/*---------- Public Routes ----------*/

router.get("/", teamCtrl.index)
router.get("/:id", teamCtrl.findOne)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post("/", checkAuth, teamCtrl.create)
router.put("/:id", teamCtrl.update)
router.delete("/:id", checkAuth, teamCtrl.deleteOne)
export { router }
