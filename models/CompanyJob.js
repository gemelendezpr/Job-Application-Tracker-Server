const { model, Schema } = require("mongoose");

const companyJobSchema = new Schema({
  companyName: { type: String },
  industry: { type: String },
  website: { type: String },
  phone: { type: String },
  email: { type: String },
  location: { type: String },
  jobs: [{
    title: { type: String },
    description: { type: String },
    requirements: { type: String },
    positionPostUrl: { type: String }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = model("CompanyJob", companyJobSchema);
