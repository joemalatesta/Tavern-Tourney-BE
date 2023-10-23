import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const matchSchema = new Schema({
  name: { type: String, unique: true },
  gameType: String,
  matchPlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  round1:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  round2:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  round3:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  round4:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  round5:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  round6:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],

  owner: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
}, {
  timestamps: true,
});

const Match = mongoose.model('Match', matchSchema);
export { Match };
