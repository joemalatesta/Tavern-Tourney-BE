
import { Router } from "express"
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js"
import * as announcementCtrl from "../controllers/announcement.js"

const router = Router()

// Public: anyone can read the landing-page announcement
router.get("/", announcementCtrl.index)

// Protected: only authenticated users can modify announcements
router.use(decodeUserFromToken)
router.post("/", checkAuth, announcementCtrl.create)
router.put("/:id", checkAuth, announcementCtrl.update)

export { router }
