const mongoose = require("mongoose");

const ClassesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  classID: {
    type: String,
    required: true,
  },
  units: [],
  students: [Number],
  teacher: Number,
});

module.exports = mongoose.model("Classes", ClassesSchema);
