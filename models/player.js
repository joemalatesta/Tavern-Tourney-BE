import mongoose from 'mongoose'

const Schema = mongoose.Schema

const playerSchema = new Schema({
  name: {type: String , unique: true},
  rank: Number,
  matchesPlayed: Number,
  matchWin: {type: Number, default: 0 },
  matchLoss: {type: Number, default: 0 },
  owner: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
},{
  timestamps: true,
})

const Player = mongoose.model('Player', playerSchema)

export { Player }
