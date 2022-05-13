const mongoose = require("mongoose");
const User = require("./Schemas/User");
const Classes = require("./Schemas/Classes");
const SCI_GR5 = require("./Schemas/SCI_GR5");
const ENG_GR5 = require("./Schemas/ENG_GR5");
const MA_GR5 = require("./Schemas/MA_GR5");
const ReportComments = require("./Schemas/Comments");
require("dotenv").config();
const { MONGO_URI } = process.env;
mongoose.connect(MONGO_URI, () => {
  console.log("connected");
});

// const run = async () => {
//   try {
// const classes = await Classes.findOneAndUpdate(
//   { name: "Science" },
//   { teacher: 123456 }
// );
// console.log(classes);
// classes.teacher = 123456;
// await classes.save();

// const user = await User.create({
//   name: "Henry Robbins",
//   role: "Teacher",
//   id: 123456,
//   email: "newteacher@test.com",
//   students: [789462, 834695, 894135],
//   classes: ["SCI-GR5", "ENG-GR5", "MA-GR5"],
// });
// const user = await User.create({
//   name: "Josie Arnold",
//   role: "Student",
//   id: 789462,
//   email: "josiearnold@test.com",
//   classes: ["SCI-GR5", "ENG-GR5", "MA-GR5"],
// });
// const user = await User.create({
//   name: "Ayat Austin",
//   role: "Student",
//   id: 834695,
//   email: "ayataustin@test.com",
//   classes: ["SCI-GR5", "ENG-GR5", "MA-GR5"],
// });
//   console.log(user);
// } catch (e) {
//   console.log(e.message);
// }

// This^ does the same thing as these 2 below
//   const user = new User({
//     name: "Henry Robbins",
//     role: "Teacher",
//     id: "123456",
//     email: "newteacher@test.com",
//   });
//   await user.save();
// };
// run();

const addClasses = async () => {
  try {
    const classes = await Classes.create([
      {
        name: "Math",
        classID: "MA_GR5",
        units: [
          "Numbers",
          "Algebra",
          "Data",
          "Spacial Sense",
          "Financial Literacy",
        ],
        students: [789462, 894135, 834695],
        teacher: 123456,
      },
      {
        name: "English",
        classID: "ENG_GR5",
        units: ["Oral Presentation", "Reading", "Writing", "Media Literacy"],
        students: [
          789462,

          894135,

          834695,
        ],
        teacher: 123456,
      },
      {
        name: "Science",
        classID: "SCI_GR5",
        units: [
          "Earth and Space",
          "Life Systems",
          "Matter and Energy",
          "Structures and Mechanisms",
        ],
        students: [
          789462,

          894135,

          834695,
        ],
        teacher: 123456,
      },
    ]);
    console.log(classes);
  } catch (e) {
    console.log(e.message);
  }
};

// addClasses();

const addReport = async () => {
  try {
    const reports = await MA_GR5.create([
      {
        firstName: "Josie",
        lastName: "Arnold",
        studentID: 789462,
        Numbers: 90,
        Algebra: 81,
        Data: 76,
        SpacialSense: 89,
        FinancialLiteracy: 79,
      },
      {
        firstName: "Charlie",
        lastName: "Horton",
        studentID: 894135,
        Numbers: 72,
        Algebra: 70,
        Data: 83,
        SpacialSense: 76,
        FinancialLiteracy: 81,
      },
      {
        firstName: "Ayat",
        lastName: "Austin",
        studentID: 834695,
        Numbers: 86,
        Algebra: 73,
        Data: 75,
        SpacialSense: 85,
        FinancialLiteracy: 82,
      },
    ]);
    //   {
    //     firstName: "Josie",
    //     lastName: "Arnold",
    //     studentID: 789462,
    //     OralPresentation: 79,
    //     Reading: 72,
    //     Writing: 76,
    //     MediaLiteracy: 81,
    //   },
    //   {
    //     firstName: "Charlie",
    //     lastName: "Horton",
    //     studentID: 894135,
    //     OralPresentation: 90,
    //     Reading: 93,
    //     Writing: 89,
    //     MediaLiteracy: 87,
    //   },
    //   {
    //     firstName: "Ayat",
    //     lastName: "Austin",
    //     studentID: 834695,
    //     OralPresentation: 71,
    //     Reading: 90,
    //     Writing: 86,
    //     MediaLiteracy: 89,
    //   },
    // ]);
    // const reports = await SCI_GR5.create([
    //   {
    //     firstName: "Josie",
    //     lastName: "Arnold",
    //     studentID: 789462,
    //     EarthAndSpace: 75,
    //     LifeSystems: 83,
    //     MatterAndEnergy: 90,
    //     StructuresAndMechanisms: 92,
    //   },
    //   {
    //     firstName: "Charlie",
    //     lastName: "Horton",
    //     studentID: 894135,
    //     EarthAndSpace: 65,
    //     LifeSystems: 74,
    //     MatterAndEnergy: 80,
    //     StructuresAndMechanisms: 79,
    //   },
    //   {
    //     firstName: "Ayat",
    //     lastName: "Austin",
    //     studentID: 834695,
    //     EarthAndSpace: 72,
    //     LifeSystems: 79,
    //     MatterAndEnergy: 86,
    //     StructuresAndMechanisms: 83,
    //   },
    // ]);

    console.log(reports);
  } catch (e) {
    console.log(e.message);
  }
};

const addComment = async () => {
  try {
    const comments = await ReportComments.create([
      {
        classID: "ENG_GR5",
        rank: "Exellent",
        comment:
          "${name} shows the ability to quickly use spelling, punctuation and grammar rules that were recently taught. ${He/she} is able to quickly learn new skills and is eager to apply them to ${his/her} writing.",
      },
      {
        classID: "ENG_GR5",
        rank: "Satisfactory",
        comment:
          "${name} makes a good effort to make ${his/her} handwriting legible. ${He/she} is able to print on the lines, use good spacing, and form letters correctly.",
      },
      {
        classID: "ENG_GR5",
        rank: "Needs Imporvement",
        comment:
          "${name} has difficulty remembering previously discussed writing skills and often makes errors with punctuation, grammar, and overall sentence structure. Basic writing skills need improvement.",
      },
    ]);
    console.log(comments);
  } catch (e) {
    console.log(e.message);
  }
};

// addReport();

// addComment();
