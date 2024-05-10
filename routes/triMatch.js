import { Router } from "express"
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js"
import * as triMatchCtrl from "../controllers/triMatch.js"

const router = Router()

/*---------- Public Routes ----------*/

router.get("/", triMatchCtrl.index)
router.get("/:id", triMatchCtrl.findOne)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post("/", checkAuth, triMatchCtrl.create)
router.delete("/:id", checkAuth, triMatchCtrl.delete)
router.put("/:id", triMatchCtrl.update)

export { router }
