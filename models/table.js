import mongoose from "mongoose"

const Schema = mongoose.Schema

function validateMatchesLength(value) {
  return value.length <= 3
}

const tableSchema = new Schema(
  {
    tableNumber: Number,
    homeTeam: Object,
    awayTeam: Object,
    completed: { type: Boolean, default: false },
    match1: {type: mongoose.Schema.Types.ObjectId, ref: "Match", default: null},
    match2: {type: mongoose.Schema.Types.ObjectId, ref: "Match", default: null},
    match3: {type: mongoose.Schema.Types.ObjectId, ref: "Match", default: null},
    match1Completed: {type: Boolean, default: false},
    match2Completed: {type: Boolean, default: false},
    match3Completed: {type: Boolean, default: false},
    homeTeamApproval: { type: Schema.Types.ObjectId, ref: "Profile", default: null },
    awayTeamApproval: { type: Schema.Types.ObjectId, ref: "Profile", default: null },
  },
  {
    timestamps: true,
  }
)

const Table = mongoose.model("Table", tableSchema)
export { Table }
