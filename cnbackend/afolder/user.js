const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});
const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 25,
    // custome validator all these custome and default
    // validations works for create and save methods
    // so instead update() updatemany() we use user.findById().save()
    validate: {
      validator: (v) => v % 2 === 0,
      message: (props) => `${props.value} is not an even number`,
    },
  },
  email: {
    type: String,
    minLength: 10,
    required: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    immutalbe: true,
    default: () => {
      const gmtDateTime = new Date().toUTCString();

      return gmtDateTime;
    },
  },
  updatedAt: {
    type: Date,
    default: () => {
      const gmtDateTime = new Date().toUTCString();

      return gmtDateTime;
    },
  },
  bestfrn: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
  },
  hobbies: [String],
  address: addressSchema,
});
//adding stuff to schema afterwards
// adding method to every single instance of user
// in mongoose we can't use arrow fun's so we use this.name
userSchema.methods.sayhi = function () {
  console.log(`hi my name ${this.name}`);
};
// Static methods
// userSchema.statics.findByName = function (name) {
//   return this.where({ name: new RegExp(name, "i") });
// };
// we can add particularly only to the query as follow's
userSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, "i") });
};
userSchema.query.ByName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

//### User.ByName() is only available on qurie's
//### User.where().findByName() is only available on model instances

// #virtuals are properties such as above methods and query
// we no need to store the combined value of both name and email in another property which duplicates the data
// but using virtuals we make use of such properties without duplication of data
// userSchema.virtual("namedEmail").get(function () {
//   return `${this.name} <${this.email}>`;
// });

// middleware allow's us to insert code in between actions such as save a user or create a user
// saving, validating, removing and updating
// userSchema.pre{used to before saving} sush as userSchema.pre("save") [means before save] OR userSchema.post

userSchema.pre("save", function (next) {
  const gmtDateTime = new Date().toUTCString();
  this.updatedAt = gmtDateTime;
  console.log("here");
  next();
});

module.exports = mongoose.model("users", userSchema);
