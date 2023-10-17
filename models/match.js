import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const matchSchema = new Schema({
  name: { type: String, unique: true },
  enum: ['8 Ball', '9 Ball'],
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
}, {
  timestamps: true,
});

const Match = mongoose.model('Match', matchSchema);
export { Match };
