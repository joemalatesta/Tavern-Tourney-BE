import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  name: { type: String, unique: true },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teams' }],
  owner: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
  startDate: Date,
  playDates:[Date],
  matches: Array,
  
}, {
  timestamps: true,
});

const Schedule = mongoose.model('Schedule', scheduleSchema);
export { Schedule };