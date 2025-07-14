import { Router } from "express";
import express from "express";
import { Course, User } from "../models/db";
import bcrypt, { genSalt } from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { authMiddleware } from "../middleware/User";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: " input fields cant be empty" });
    return;
  }
  try {
    const Finduser = await User.findOne({
      username: username,
    });
    if (Finduser) {
      res.status(400).json({ message: "user already exist" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, salt);

    const newUser = User.create({
      username: username,
      password: hashedpass,
    });
    res.status(200).json({ message: "user signedup" });
  } catch (e) {
    console.log(e);
  }
});


router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Input fields can't be empty" });
  }

  try {
    const Finduser = await User.findOne({ username });

    if (!Finduser || !Finduser.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const pass = await bcrypt.compare(password, Finduser.password as any)
    if (!pass) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: Finduser._id }, JWT_SECRET);

    res.status(200).json({
      token,
      message: "User signed in",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});



router.get("/home", authMiddleware, async (req, res) => { 
  const userId = req.userId
  console.log("userId is", userId); // should be a string
  const Findcourse = await User.findById(userId).populate("enrolledCourseId")
  if(!Findcourse){
    res.status(400).json({msg:"no contents"})
    return
  }else{
    res.json({Findcourse,msg:"course found"})
    return
  }
});


router.post("/course", (req, res) => {});

router.post("/course/week", (req, res) => {});

router.post("/week/content", (req, res) => {});

export default router;
