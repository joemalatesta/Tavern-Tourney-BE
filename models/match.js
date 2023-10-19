import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const matchSchema = new Schema({
  name: { type: String, unique: true },
  gameType: String,
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
}, {
  timestamps: true,
});

const Match = mongoose.model('Match', matchSchema);
export { Match };
