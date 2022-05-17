const mongoose = require("mongoose");

const EnglishReportSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  studentID: {
    type: Number,
    required: true,
  },
  OralPresentation: Number,
  Reading: Number,
  Writing: Number,
  MediaLiteracy: Number,
  FinalGrade: Number,
  Comment: String,
});

module.exports = mongoose.model("ENG_GR5", EnglishReportSchema);
