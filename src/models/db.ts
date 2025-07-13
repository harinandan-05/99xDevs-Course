import mongoose, { Schema, Types } from "mongoose";

async function backend() {
  try {
    await mongoose.connect(
      "mongodb+srv://testuserharin:hari2005@cluster0.llwnf.mongodb.net/99xDevs"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
}
backend();

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  enrolledCourseId: { type: Types.ObjectId, ref: "Course" },
});

const CourseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  courseId: { type: Types.ObjectId },
  weeks: { type: Types.ObjectId, ref: "Week" }
});

const PurchaseSchema = new Schema({
  username: { type: String, unique: true, required: true },
  purchasedCourseId: { type: Types.ObjectId, ref: "Course", required: true }
});

const LectureSchema = new Schema({
  title: { type: String, required: true },
  week: { type: Types.ObjectId, ref: "Week", required: true },
  thumbnailUrl: { type: String },
  notesUrl: { type: String }
});

const WeekSchema = new Schema({
  title: { type: String, unique: true, required: true },
  course: { type: Types.ObjectId, ref: "Course" },
  lecture: { type: Types.ObjectId, ref: "Lecture" }
});

export const User = mongoose.model("User", UserSchema);
export const Course = mongoose.model("Course", CourseSchema);
export const Purchase = mongoose.model("Purchase", PurchaseSchema);
export const Lecture = mongoose.model("Lecture", LectureSchema);
export const Week = mongoose.model("Week", WeekSchema);

