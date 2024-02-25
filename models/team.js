import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const teamSchema = new Schema({
  teamName: { type: String, unique: true },
  teamPlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  teamCaptain: {type: mongoose.Schema.Types.ObjectId, ref: 'Player' }
}, {
  timestamps: true,
});

const Team = mongoose.model('Team', teamSchema);
export { Team };
  