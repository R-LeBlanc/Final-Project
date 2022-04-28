"use strict";
const {
  getAnnouncements,
  getClassNames,
  getClassList,
  getSubjects,
} = require("./handlers");
// const {
//   announceImport,
//   classImport,
//   studentsImport,
// } = require("./BatchImports");

const express = require("express");

const PORT = process.env.PORT || 4000;

const app = express();

// Endpoints ******************
app.get("/announcements/:id", getAnnouncements);
app.get("/announcements", getClassNames);
app.get("/classList/:id", getClassList);
app.get("/subjects", getSubjects);
// this is our catch all endpoint.
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});
// **********************************

// Node spins up our server and sets it to listen on port 8000.
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
