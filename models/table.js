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
    awayMatch1: {type: mongoose.Schema.Types.ObjectId, ref: "Match", default: null},
    awayMatch2: {type: mongoose.Schema.Types.ObjectId, ref: "Match", default: null},
    awayMatch3: {type: mongoose.Schema.Types.ObjectId, ref: "Match", default: null},
    homeMatch1 : {type: mongoose.Schema.Types.ObjectId, ref: "Match", default: null},
    homeMatch2 : {type: mongoose.Schema.Types.ObjectId, ref: "Match", default: null},
    homeMatch3 : {type: mongoose.Schema.Types.ObjectId, ref: "Match", default: null},
    homeTeamApproval: { type: Schema.Types.ObjectId, ref: "Profile", default: null },
    awayTeamApproval: { type: Schema.Types.ObjectId, ref: "Profile", default: null },
  },
  {
    timestamps: true,
  }
)

const Table = mongoose.model("Table", tableSchema)
export { Table }
