
import { Announcement } from "../models/announcement.js"

const index = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .sort({ updatedAt: -1 })
      .limit(1)

    res.json(announcements[0] || null)
  } catch (error) {
    res.status(500).json({ err: error.message })
  }
}

const create = async (req, res) => {
  try {
    const announcement = await Announcement.create({
      message: req.body.message || "",
    })

    res.status(201).json(announcement)
  } catch (error) {
    res.status(400).json({ err: error.message })
  }
}

const update = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { message: req.body.message },
      { new: true, runValidators: true }
    )

    if (!announcement) {
      return res.status(404).json({ err: "Announcement not found" })
    }

    res.json(announcement)
  } catch (error) {
    res.status(400).json({ err: error.message })
  }
}

export { index, create, update }
