const mongoose = require("mongoose");
const User = require("./Schemas/User");
const Classes = require("./Schemas/Classes");
require("dotenv").config();
const { MONGO_URI } = process.env;
mongoose.connect(MONGO_URI, () => {
  console.log("connected");
});

const run = async () => {
  try {
    // const classes = await Classes.findOneAndUpdate(
    //   { name: "Science" },
    //   { teacher: 123456 }
    // );
    // console.log(classes);
    // classes.teacher = 123456;
    // await classes.save();

    const user = await User.create({
      name: "Henry Robbins",
      role: "Teacher",
      id: 123456,
      email: "newteacher@test.com",
      students: [789462, 834695, 894135],
      classes: ["SCI-GR5", "ENG-GR5", "MA-GR5"],
    });
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
    console.log(user);
  } catch (e) {
    console.log(e.message);
  }

  // This^ does the same thing as these 2 below
  //   const user = new User({
  //     name: "Henry Robbins",
  //     role: "Teacher",
  //     id: "123456",
  //     email: "newteacher@test.com",
  //   });
  //   await user.save();
};
// run();

const addClasses = async () => {
  try {
    const classes = await Classes.create({
      name: "Math",
      classID: "MA-GR5",
      units: [
        "Numbers",
        "Algebra",
        "Data",
        "Stpacial Sense",
        "Financial Literacy",
      ],
      students: [789462, 894135, 834695],
      teacher: 123456,
    });
    console.log(classes);
  } catch (e) {
    console.log(e.message);
  }
};

// addClasses();
