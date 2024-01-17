const { model, Schema } = require("mongoose");

const interviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  company: {type: Schema.Types.ObjectId, ref: 'Company'},
  position: String,
  review: String,
  jobDetails: String,
  location: String,
  challenges: String,
  interviewType: String,
  interviewDifficulty: String,
  interviewDate: Date,
  interviewer: String,
  linkedin: String,
  userNotes: String,
});

module.exports = model("Interview", interviewSchema);


