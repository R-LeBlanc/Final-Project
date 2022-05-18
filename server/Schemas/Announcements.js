const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  // Add the collection so that mongoose knows to use this
  // pre-existing collection
  { collection: "Announcements" }
);

module.exports = mongoose.model("Announcement", announcementSchema);
