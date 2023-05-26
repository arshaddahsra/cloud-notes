const express = require("express");
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "@#$1242$@!#";
// Route:1 Create a User using:POST "/api/auth/createuser" dosen't require login
router.post(
  "/createuser",
  body("name", "enter a valid name of min length 3").isLength({ min: 3 }),
  body("email", "enter a valid email").isEmail(),
  body("password", "enter a valid password of min length 3").isLength({
    min: 5,
  }),
  async (req, res) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //check whether the user exist with this email

      user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ errors: "sorry a user with this email already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);

      //   create a user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwttoken = jwt.sign(data, JWT_SECRET);
      //   res.json(user);
      res.json({ jwttoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);
// Route:2 logging in a User using:POST "/api/auth/createuser" dosen't require login
router.post(
  "/login",
  body("email", "enter a valid email").isEmail(),
  body("password", "enter a valid password of min length 3").exists(),
  async (req, res) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return req
          .status(400)
          .json({ error: "please try to login with correct credentials" });
      }
      const passcompare = await bcrypt.compare(password, user.password);
      if (!passcompare) {
        return req
          .status(400)
          .json({ error: "please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwttoken = jwt.sign(data, JWT_SECRET);
      res.json({ jwttoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);
// Route:3 Fetch User details:POST "/api/auth/getuser" dosen't require login
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    // console.log(req.user);
    const userinfo = await User.findById(userid).select("-password");
    res.send(userinfo);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});
module.exports = router;
