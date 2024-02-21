import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const matchSchema = new Schema({
  name: { type: String, unique: true },
  gameType: String,
  matchPlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  rounds: Array,
  loserRounds: Array,
  doubleElim: Boolean,
  handicap: Boolean,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
}, {
  timestamps: true,
});

const Match = mongoose.model('Match', matchSchema);
export { Match };
