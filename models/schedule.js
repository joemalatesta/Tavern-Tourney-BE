import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  name: String,
  completed: {type: Boolean, default: false},
  matches: Array,
  bye: Object,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
  matchesforApproval: Array,
  ApprovedMatches: Array,
}, {
  timestamps: true,
});

const Schedule = mongoose.model('Schedule', scheduleSchema);
export { Schedule };