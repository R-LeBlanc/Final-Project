const fs = require("file-system");
const { MongoClient } = require("mongodb");
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const announcements = JSON.parse(fs.readFileSync("data/announcements.json"));
const classes = JSON.parse(fs.readFileSync("data/classes.json"));
const students = JSON.parse(fs.readFileSync("data/students.json"));

const announceImport = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  announcements.forEach((announcement) => {
    let _id = uuidv4();
    announcement["_id"] = _id;
  });
  try {
    await client.connect();
    const db = client.db("SmartReports");
    await db.collection("Announcements").insertMany(announcements);
  } catch (err) {
    console.log(err.message);
  }
  console.log("success!");
  client.close();
};

const classImport = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  classes.forEach((classe) => {
    let _id = uuidv4();
    classe["_id"] = _id;
  });
  try {
    await client.connect();
    const db = client.db("SmartReports");
    await db.collection("Classes").insertMany(classes);
  } catch (err) {
    console.log(err.message);
  }
  console.log("success!");
  client.close();
};

const studentsImport = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  students.forEach((student) => {
    let _id = uuidv4();
    student["_id"] = _id;
  });
  try {
    await client.connect();
    const db = client.db("SmartReports");
    await db.collection("GR5-Robbins").insertMany(students);
  } catch (err) {
    console.log(err.message);
  }
  console.log("success!");
  client.close();
};

// module.exports = { announceImport, classImport, studentsImport };
