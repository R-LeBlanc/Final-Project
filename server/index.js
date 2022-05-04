"use strict";
const {
  getAnnouncements,
  getClassNames,
  getDashBoardInfo,
  getClassList,
  getSubjects,
  getStudents,
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
// Will return the announcements based on the id passed in (the id is the class name)
app.get("/announcements/:id", getAnnouncements);
// Will get a list of the classes that have announcements
app.get("/announcements", getClassNames);
// Will get the users information
app.get("/dashboard/:id", getDashBoardInfo);
// app.get("/classList/:id", getClassList);
// app.get("/subjects", getSubjects);
app.get("/students/:id", getStudents);
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
