import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const teamSchema = new Schema({
  teamName: { type: String, unique: true },
  teamPlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  teamCaptain: String,
  wins: {type:Number, default: 0, min:0},
  loss: {type:Number, default: 0, min:0},
}, {
  timestamps: true,
});

const Team = mongoose.model('Team', teamSchema);
export { Team };
  