"use strict";

require("dotenv").config();
const { query } = require("express");
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Used to get and format the announcements ***********
const getAnnouncements = async (req, res) => {
  const id = req.params.id;
  const query = { class: id };
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("SmartReports");

  db.collection("Announcements")
    .find(query)
    .toArray(function (err, result) {
      if (err) {
        res.status(500).json({ status: 500, message: err });
      }
      res.status(200).json({ status: 200, data: result });
      client.close();
    });
};

const getClassNames = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("SmartReports");

  db.collection("Announcements")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(500).json({ status: 500, message: err });
      }
      const data = result.map((item) => item.class);
      const uniqueData = [...new Set(data)];
      res.status(200).json({ status: 200, data: uniqueData });
      client.close();
    });
};
//  *********************

const getClassList = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("SmartReports");

  db.collection(`${req.params.id}`)
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(500).json({ status: 500, message: err });
      }

      res.status(200).json({ status: 200, data: result });
      client.close();
    });
};

const getSubjects = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("SmartReports");

  db.collection(`Classes`)
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(500).json({ status: 500, message: err });
      }
      res.status(200).json({ status: 200, data: result });
      client.close();
    });
};

const updateGrade = async (req, res) => {};

module.exports = { getAnnouncements, getClassNames, getClassList, getSubjects };
