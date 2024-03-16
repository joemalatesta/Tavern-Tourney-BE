import mongoose from 'mongoose'
import { Team } from '../models/team.js'
import { Player } from '../models/player.js'

const Schema = mongoose.Schema

const playedMatchSchema = new Schema({
  matchDate: String,
  completed: Boolean,
  confirmed: Boolean,
  winningTeam: Object,
  winningPlayer: Object,
  losingTeam: Object,
  losingPlayer: Object,
  winnerGamesPlayed: Number,
  loserGamesPlayed: Number,
},{
  timestamps: true,
})

const PlayedMatch= mongoose.model('PlayedMatch', playedMatchSchema)

export { PlayedMatch }
