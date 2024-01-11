const { model, Schema } = require("mongoose");

const companyJobSchema = new Schema({
  companyName: { type: String },
  industry: { type: String },
  website: { type: String },
  phone: { type: String },
  email: { type: String },
  positionPostUrl: { type: String },
  location: { type: String }
});

module.exports = model("CompanyJob", companyJobSchema);
