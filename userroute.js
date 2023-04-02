

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("./usermodel.js");
require("dotenv").config();
const userRouter = express.Router();

//defining routes
userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

userRouter.post("/register", async (req, res) => {
  const { email, password, first_name, last_name, gender, age, city } =
    req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) res.send({ msg: "Something went wrong", error: err.message });
      else {
        const user = new UserModel({
          first_name,
          last_name,
          email,
          password: hash,
          gender,
          age,
          city,
        });
        await user.save();
        res.send({ msg: "New Users has been register" });
      }
    });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          let token = jwt.sign({ userID: user[0]._id }, process.env.userkey);
          res.send({ msg: "Login Successful", token: token });
        } else {
          res.send({ msg: "Wrong Credentials" });
        }
      });
    } else {
      res.send({ msg: "Wrong Credentials" });
    }
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

userRouter.put("/update", async (req, res) => {
  const user = req.body;
  const token = req.header.authorization;
  // jwt.verify(token,process.env.userkey)
  try {
    const userdoc = await UserModel.findOneAndUpdate({ _id: user._id }, user);
    res.send(userdoc);
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

// DELETE a user by ID
userRouter.delete("/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = { userRouter };
