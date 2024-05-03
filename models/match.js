import mongoose from "mongoose"

const Schema = mongoose.Schema

const matchSchema = new Schema(
  {
    player1: { type: Object, default: {} },
    player2: { type: Object, default: {} },
    completed: { type: Boolean, default: false },
    winningTeam: { type: Object, default: {} },
    losingTeam: { type: Object, default: {} },
    player1GamesWon: { type: Number, default: 0 },
    player2GamesWon: { type: Number, default: 0 },
    player1Wins: { type: Object, default: {} },
    player2Wins: { type: Object, default: {} },
  },
  {
    timestamps: true,
  }
)

const Match = mongoose.model("Match", matchSchema)
export { Match }
