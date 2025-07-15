"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../models/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const User_1 = require("../middleware/User");
const router = express_1.default.Router();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ message: " input fields cant be empty" });
        return;
    }
    try {
        const Finduser = yield db_1.User.findOne({
            username: username,
        });
        if (Finduser) {
            res.status(400).json({ message: "user already exist" });
            return;
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedpass = yield bcrypt_1.default.hash(password, salt);
        const newUser = db_1.User.create({
            username: username,
            password: hashedpass,
        });
        res.status(200).json({ message: "user signedup" });
    }
    catch (e) {
        console.log(e);
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Input fields can't be empty" });
    }
    try {
        const Finduser = yield db_1.User.findOne({ username });
        if (!Finduser || !Finduser.password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const pass = yield bcrypt_1.default.compare(password, Finduser.password);
        if (!pass) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: Finduser._id }, config_1.JWT_SECRET);
        res.status(200).json({
            token,
            message: "User signed in",
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.get("/home", User_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const Findcourse = yield db_1.User.findById(userId).populate("enrolledCourseId");
    if (!Findcourse) {
        res.status(400).json({ msg: "no contents" });
        return;
    }
    else {
        res.json({ Findcourse, msg: "course found" });
        return;
    }
}));
router.post("/create-course", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield db_1.Course.create({
        title: "Fullstack Web Dev",
        description: "Learn MERN with projects",
        thumbnailUrl: "https://example.com/image.png"
    });
    res.json({ course });
}));
router.get("/courses/:id", User_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.id;
    const Findweek = yield db_1.Course.findById(courseId).populate({
        path: "weeks",
        select: "title thumbnailUrl"
    }).lean();
    console.log(Findweek);
    if (!Findweek) {
        res.status(400).json({ msg: "weeks not found" });
        return;
    }
    res.status(200).json({ msg: "weeks", week: Findweek });
    return;
}));
router.post("/course/week", (req, res) => { });
router.post("/week/content", (req, res) => { });
exports.default = router;
