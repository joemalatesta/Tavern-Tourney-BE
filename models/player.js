import mongoose from 'mongoose'

const Schema = mongoose.Schema

const playerSchema = new Schema({
  name: {type: String , unique: true},
  rank: Number,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
},{
  timestamps: true,
})

const Player = mongoose.model('Player', playerSchema)

export { Player }
