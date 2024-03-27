import mongoose from 'mongoose'

const Schema = mongoose.Schema

const moneySchema = new Schema({
  balance: Number,
  totalWinsBalance: Number,
  datePaid: String,
  amountPaid: Number,
  teamPaid: Number,
  teamName: Object,
  personPaidOnTeam: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  
},{
  timestamps: true,
})

const Money = mongoose.model('Money', moneySchema)

export { Money }