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
  const Findcourse = await User.findById(userId).populate("enrolledCourseId")
  if(!Findcourse){
    res.status(400).json({msg:"no contents"})
    return
  }else{
    res.json({Findcourse,msg:"course found"})
    return
  }
});

router.post("/create-course", async (req, res) => {
  const course = await Course.create({
    title: "Fullstack Web Dev",
    description: "Learn MERN with projects",
    thumbnailUrl: "https://example.com/image.png"
  });
  res.json({ course });
});


router.get("/courses/:id", authMiddleware,async (req, res) => { // this is the section where we see weeks
  const courseId = req.params.id;
  const course = await Course.findById(courseId)
  .select("weeks title")
  .populate({
    path: "weeks",
    select: "title thumbnailUrl",
  })
  .lean();

  if(!course){
    res.status(400).json({msg:"weeks not found"})
    return
  }
  res.status(200).json({msg:"weeks", week: course})
  return;
});

router.post("/course/week", (req, res) => {});

router.post("/week/content", (req, res) => {});

export default router;
