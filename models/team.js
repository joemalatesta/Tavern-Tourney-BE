import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const teamSchema = new Schema({
  teamName: { type: String, unique: true },
  teamPlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  teamCaptain: String,
  wins: Number,
  loss: Number
}, {
  timestamps: true,
});

const Team = mongoose.model('Team', teamSchema);
export { Team };
  