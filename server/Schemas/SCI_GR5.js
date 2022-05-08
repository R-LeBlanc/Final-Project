const mongoose = require("mongoose");

const ScienceReportSchema = new mongoose.Schema({
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
  EarthAndSpace: Number,
  LifeSystems: Number,
  MatterAndEnergy: Number,
  StructuresAndMechanisms: Number,
});

module.exports = mongoose.model("SCI_GR5", ScienceReportSchema);
