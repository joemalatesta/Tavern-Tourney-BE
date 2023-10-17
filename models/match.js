import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const matchSchema = new Schema({
  MatchName: { type: String, unique: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
}, {
  timestamps: true,
});

const Match = mongoose.model('Match', matchSchema);
export { Match };
