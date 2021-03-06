"use strict";
const {
  getAnnouncements,
  getClassNames,
  postAnnouncements,
  deleteAnnouncement,
  getDashBoardInfo,
  getClassList,
  getClass,
  getReportComment,
  getReportByClass,
  getReportsByStudent,
  updateReportByClass,
  getStudents,
} = require("./handlers");
// const {
//   announceImport,
//   classImport,
//   studentsImport,
// } = require("./BatchImports");
const express = require("express");
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Endpoints ******************
// Will return the announcements based on the id passed in (the id is the class name)
app.get("/announcements/:id", getAnnouncements);
// Will get a list of the classes that have announcements
app.get("/announcements", getClassNames);
// Posts announcements to database
app.post("/announcements", postAnnouncements);
// Will delete an announcement by id
app.delete("/announcements/:id", deleteAnnouncement);
// Will get the users information
app.get("/dashboard/:id", getDashBoardInfo);
// Will get a list of the teachers classes from the database
app.get("/classlist/:teacherID", getClassList);
// Will get a single class from the database
app.get("/classlist/:teacherID/:classID", getClass);
// Will get the report card info from the selected class
app.get("/report/:classID", getReportByClass);
// Will get a students grade for every class they are in
app.get("/report/:classID/:studentID", getReportsByStudent);
// Will update the grades for the class
app.patch("/report/:classID", updateReportByClass);
// app.get("/subjects", getSubjects);
app.get("/students/:id", getStudents);
// Will get a reportcard comment from the comment bank
app.get("/comment/:classID/:rank", getReportComment);

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
