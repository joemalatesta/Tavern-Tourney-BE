import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const leagueSchema = new Schema({
  name: { type: String, unique: true },
  gameType: String,
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teams' }],
  owner: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
  startDate: Date,
}, {
  timestamps: true,
});

const League = mongoose.model('League', leagueSchema);
export { League };
