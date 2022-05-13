const mongoose = require("mongoose");

const ReportCommentsSchema = new mongoose.Schema({
  classID: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ReportComments", ReportCommentsSchema);
