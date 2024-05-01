import { Router } from "express"
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js"
import * as sessionCtrl from "../controllers/session.js"

const router = Router()

/*---------- Public Routes ----------*/

router.get("/", sessionCtrl.index)
router.get("/:id", sessionCtrl.findOne)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post("/", sessionCtrl.create)
router.put("/:id", sessionCtrl.update)
router.delete("/:id", checkAuth, sessionCtrl.deleteOne)
export { router }
