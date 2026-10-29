import mongoose from "mongoose"

const announcementSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      default: "",
      maxlength: 10000,
    },
  },
  { timestamps: true },
)

const Announcement = mongoose.model("Announcement", announcementSchema)

export { Announcement }
