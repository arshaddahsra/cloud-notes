const mongoose = require("mongoose");
const mongoURI =
  "mongodb://localhost:27017/cloudnotes?readPreference=primary&appname=MongoDB%20Compass&directConnection=true";
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connected to mongoo");
  });
};
module.exports = connectToMongo;
