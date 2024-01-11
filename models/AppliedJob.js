const { model, Schema } = require("mongoose");

const appliedJobSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  companyJob: {type: Schema.Types.ObjectId, ref: 'CompanyJob'},
  status: { type: String, enum: ['Not Applied', 'Applied', 'Behavioral Interview', 'Technical Interview 1', 'Technical Interview 2', 'Offer', 'Rejection'] },
  applicationDate: {type: Date, default: Date.now},
  meetingUrl: { type: String },
  interviewer: { type: String },
  phone: { type: String },
  email: { type: String },
  location: { type: String },
  notes: { type: String },
});

module.exports = model("AppliedJob", appliedJobSchema);
