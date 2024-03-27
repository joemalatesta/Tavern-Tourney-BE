import mongoose from 'mongoose'

const Schema = mongoose.Schema

const playerSchema = new Schema({
  name: {type: String , unique: true},
  rank: {type:Number, default: 50, min:1},
  matchesPlayed: {type: Number, default: 0 },
  matchWin: {type: Number, default: 0 },
  matchLoss: {type: Number, default: 0 },
  profile: { type: Schema.Types.ObjectId, ref: 'Profile' , default: null},
},{
  timestamps: true,
})

const Player = mongoose.model('Player', playerSchema)

export { Player }
