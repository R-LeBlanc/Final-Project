const mongoose = require("mongoose");

const ReportCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  studentID: {
    type: Number,
    required: true,
  },
});
