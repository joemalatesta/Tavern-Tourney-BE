import mongoose from "mongoose"

const Schema = mongoose.Schema

const matchSchema = new Schema(
  {
    player1: { type: Object, default: {} },
    player2: { type: Object, default: {} },
    completed: { type: Boolean, default: false },
    winningTeam: { type: Object, default: {} },
    losingTeam: { type: Object, default: {} },
    player1Wins: { type: Array, default: null },
    player2Wins: { type: Array, default: null },
  },
  {
    timestamps: true,
  }
)

const Match = mongoose.model("Match", matchSchema)
export { Match }
