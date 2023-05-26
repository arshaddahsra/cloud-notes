// install nodejs, npm, mongoose, nodemon
// then run nodemon ./mongoosetutore.js
const mongoose = require("mongoose"); //import mongoose
const User = require("./afolder/user");
mongoose.connect(
  "mongodb://localhost:27017/mongootutor?readPreference=primary&appname=MongoDB%20Compass&directConnection=true",
  () => {
    console.log("connected to mongoose");
  }
); //connecting to mongodb
run();

async function run() {
  // user=new user({})   await user.save
  // OR
  // user=await user.create({user:"kalu"})
  // user.name="arshad" //name has changed so await user.save() is called
  try {
    // #creating a user
    // const user = await User.create({
    //   name: "hannu2",
    //   age: 14,
    //   email: "khaleed@gamil.com",
    //   hobbies: ["playing", "learing", "cooking"],
    //   address: { street: "main road" },
    // });
    // #find... methods
    // #const user = await User.findById("63bb9e1a81d3c3c79f4d7955");  //returns whole object
    // #const user = await User.find({ name: "arshad" });
    // #const user=await User.exist({name:"arshad"}) //returns Boolean
    // deleteOne() deletes the first match  //returns Deleted COUNT
    // deleteMany() deletes every thing that matches
    // CUSTOME QURIES
    // #const user = await User.where("age")
    //   .gt(12)
    //   .lt(32)
    //   .where("name")
    //   .equals("arshad")
    //   .limit(1)
    //   .populate("bestfrn"); //used to joins
    // user[0].bestfrn = "63bb9e1a81d3c3c79f4d7955";
    // await user[0].save();
    // User.where("name").equals("arshad")
    // user.sayhi();
    // using static method below
    // const user = await User.find().ByName("khaleed");
    const user1 = await User.findOne({ name: "hannu2" });
    console.log(user1);
    await user1.save();
    console.log(user1);
    // console.log(user.namedEmail); //these are just virtual properties
  } catch (error) {
    console.log(error.message);
  }
}
