"use strict";

require("dotenv").config();

const { MongoClient, MongoUnexpectedServerResponseError } = require("mongodb");
const { MONGO_URI } = process.env;

const mongoose = require("mongoose");
const User = require("./Schemas/User");
const Announcements = require("./Schemas/Announcements");
const Classes = require("./Schemas/Classes");
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
  // getClassList,
  // getSubjects,
  getStudents,
};
