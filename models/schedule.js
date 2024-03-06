import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  name: String,
  matches: Array,
  bye: Object,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
}, {
  timestamps: true,
});

const Schedule = mongoose.model('Schedule', scheduleSchema);
export { Schedule };