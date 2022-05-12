const mongoose = require("mongoose");

const MathReportSchema = new mongoose.Schema({
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
  Numbers: Number,
  Algebra: Number,
  Data: Number,
  SpacialSense: Number,
  FinancialLiteracy: Number,
});

module.exports = mongoose.model("MA_GR5", MathReportSchema);
