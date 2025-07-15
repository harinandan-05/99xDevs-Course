import router from "./authcontroller";
import { authMiddleware } from "../middleware/User";
import { User } from "../models/db";
import { Course } from "../models/db";

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
