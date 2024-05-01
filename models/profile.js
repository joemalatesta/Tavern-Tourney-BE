import mongoose from "mongoose"

const Schema = mongoose.Schema

const profileSchema = new Schema(
  {
    name: String,
    firstName: String,
    lastName: String,
    email2: String,
    accessLevel: {
      type: Number,
      enum: [10, 20, 30, 40, 50, 60, 70, 80, 90],
      default: 10,
    },
    approved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

const Profile = mongoose.model("Profile", profileSchema)

export { Profile }
