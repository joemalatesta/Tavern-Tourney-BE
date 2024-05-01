import mongoose from "mongoose"

const Schema = mongoose.Schema

const sessionSchema = new Schema(
  {
    completed: { type: Boolean, default: false },
    table1: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },
    table2: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },
    table3: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },
    table4: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },
    date: String,
  },
  {
    timestamps: true,
  }
)

const Session = mongoose.model("Session", sessionSchema)
export { Session }
