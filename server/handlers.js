"use strict";

require("dotenv").config();

const { MongoClient, MongoUnexpectedServerResponseError } = require("mongodb");
const { MONGO_URI } = process.env;

const mongoose = require("mongoose");
const User = require("./Schemas/User");
const Announcements = require("./Schemas/Announcements");
const Classes = require("./Schemas/Classes");
const SCI_GR5 = require("./Schemas/SCI_GR5");
mongoose.connect(MONGO_URI, () => {
  console.log("connected");
});

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// TODO: REFORMAT TO USE MONGOOSE!!!!!!!!!

// Used to get and format the announcements ***********
const getAnnouncements = async (req, res) => {
  const id = req.params.id;
  const query = { class: id };
  try {
    const announcement = await Announcements.find(query);
    // console.log(announcement);
    res.status(200).json({ status: 200, data: announcement });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: 500, message: e.message });
  }
};

const getClassNames = async (req, res) => {
  try {
    const announcement = await Announcements.find({});
    const data = announcement.map((item) => item.class);
    const uniqueData = [...new Set(data)];
    // console.log(uniqueData);
    res.status(200).json({ status: 200, data: uniqueData });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: 500, message: e.message });
  }
};
// //  *********************

const getDashBoardInfo = async (req, res) => {
  const id = req.params.id;
  try {
    const userInfo = await User.where("email").equals(id);
    res.status(200).json({ status: 200, data: userInfo });
  } catch (e) {
    console.log(e.message);
  }
};

// TODO: convert the rest to mongoose
// Will get a list of the teachers classes from the database
const getClassList = async (req, res) => {
  const teacherID = req.params.teacherID;
  try {
    const classInfo = await Classes.where("teacher").equals(teacherID);
    if (classInfo.length <= 0) {
      res.status(404).json({ status: 404, message: "Information not found" });
    }
    res.status(200).json({ status: 200, data: classInfo });
  } catch (e) {
    console.log(e.message);
  }
};
// Will get a single class based on the teacher's id and the class id
const getClass = async (req, res) => {
  const teacherID = req.params.teacherID;
  const classID = req.params.classID;
  try {
    const classInfo = await Classes.where("teacher")
      .equals(teacherID)
      .where("classID")
      .equals(classID);
    if (classInfo.length <= 0) {
      res.status(404).json({ status: 404, message: "Information not found" });
    }
    res.status(200).json({ status: 200, data: classInfo });
  } catch (e) {
    console.log(e.message);
  }
};

const getReportByClass = async (req, res) => {
  const classID = req.params.classID;
  try {
    const reportInfo = await eval(classID).find({});
    // console.log(reportInfo);
    res.status(200).json({ status: 200, data: reportInfo });
  } catch (e) {
    console.log(e.message);
  }
};

// const getClassList = async (req, res) => {
// try{
//   const classList = await User.where("teacher").equals()
// }
// const client = new MongoClient(MONGO_URI, options);
// await client.connect();
// const db = client.db("SmartReports");

// db.collection(`${req.params.id}`)
//   .find({})
//   .toArray(function (err, result) {
//     if (err) {
//       res.status(500).json({ status: 500, message: err });
//     }

//     res.status(200).json({ status: 200, data: result });
//     client.close();
//   });
// };

// const getSubjects = async (req, res) => {
//   const client = new MongoClient(MONGO_URI, options);
//   await client.connect();
//   const db = client.db("SmartReports");

//   db.collection(`Classes`)
//     .find({})
//     .toArray(function (err, result) {
//       if (err) {
//         res.status(500).json({ status: 500, message: err });
//       }
//       res.status(200).json({ status: 200, data: result });
//       client.close();
//     });
// };

// TODO: Will grab all students by teacher
const getStudents = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.find({ id });
    // console.log(user);
    res.status(200).json({ status: 200, data: user });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: 500, message: e.message });
  }
};

module.exports = {
  getAnnouncements,
  getClassNames,
  getDashBoardInfo,
  getClassList,
  getClass,
  // getSubjects,
  getReportByClass,
  getStudents,
};
