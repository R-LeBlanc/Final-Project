const mongoose = require("mongoose");

const ReportsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  classes: {},
});

module.exports = mongoose.model("Reports", ReportsSchema);
