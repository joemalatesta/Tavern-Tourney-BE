import mongoose from 'mongoose'


const Schema = mongoose.Schema

const triMatchSchema = new Schema({
  date: String,
  homeTeam: Object,
  visitingTeam: Object,
  match1: Object,
  match2: Object,
  match3: Object,
  submittedBy: String,
  completed: {type: Boolean, default: false}
},{
  timestamps: true,
})

const TriMatch= mongoose.model('TriMatch', triMatchSchema)

export { TriMatch }