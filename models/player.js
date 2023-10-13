import mongoose from 'mongoose'

const Schema = mongoose.Schema

const playerSchema = new Schema({
  name: String,
  rank: Number
},{
  timestamps: true,
})

const Player = mongoose.model('Player', playerSchema)

export { Player }
