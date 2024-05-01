import { Router } from "express"
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js"
import * as tableCtrl from "../controllers/table.js"

const router = Router()

/*---------- Public Routes ----------*/

router.get("/", tableCtrl.index)
router.get("/:id", tableCtrl.findOne)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post("/", tableCtrl.create)
router.delete("/:id", checkAuth, tableCtrl.delete)
router.put("/:id", tableCtrl.update)

export { router }
