const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CaseSchema = new Schema({
  dispositioncode: String,
  dispositiondate: String,
  sentencetime: String,
  description: {
    type: String,
    required: true,
  },
  amendedcharge: String,
  name_user: String,
  img_user: String,
  name_lawyer: String,
  img_lawyer: String,

  typeofcase: String,
  costoffordable: Number,
  probationtime: String,
  drivingrestrictions: String,
  jail_penitentiary: String,
  lawyerResponses: [{ type: Schema.Types.ObjectId, ref: "User" }],
  userRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
  isAccepted: { type: Boolean, default: false },
  lockedlawyer: { type: Schema.Types.ObjectId, ref: "User" },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Case", CaseSchema);
