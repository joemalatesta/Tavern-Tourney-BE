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
    matches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Match",
        validate: validateMatchesLength,
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Table = mongoose.model("Table", tableSchema)
export { Table }
