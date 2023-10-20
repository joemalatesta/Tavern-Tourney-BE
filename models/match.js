import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const matchSchema = new Schema({
  name: { type: String, unique: true },
  gameType: String,
  matchPlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  bracketTier: Object,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
}, {
  timestamps: true,
});

const Match = mongoose.model('Match', matchSchema);
export { Match };
