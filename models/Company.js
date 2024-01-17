const { model, Schema } = require("mongoose");

const companySchema = new Schema({
  companyName: { type: String },
  industry: { type: String },
  website: { type: String },
  phone: { type: String },
  email: { type: String },
  location: { type: String },
  logo: { type: String, default: "https://qplexus.com/wp-content/uploads/2016/02/default-logo.png"},
  interviews: [{type: Schema.Types.ObjectId, ref: "Interview"}],
  // jobs: [{
  //   title: { type: String },
  //   description: { type: String },
  //   requirements: { type: String },
  //   positionPostUrl: { type: String }
  // }],

}, {
  timestamps: true
});

module.exports = model("Company", companySchema);
