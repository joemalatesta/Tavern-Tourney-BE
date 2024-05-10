import mongoose from "mongoose"

const Schema = mongoose.Schema

function validateMatchesLength(value) {
  return value.length <= 3
}

const triMatchSchema = new Schema(
  {
    match1: {type: mongoose.Schema.Types.ObjectId, ref: "Match", default: null},
    match2: {type: mongoose.Schema.Types.ObjectId, ref: "Match", default: null},
    match3: {type: mongoose.Schema.Types.ObjectId, ref: "Match", default: null},
  },
  {
    timestamps: true,
  }
)

const TriMatch = mongoose.model("TriMatch", triMatchSchema)
export { TriMatch }

