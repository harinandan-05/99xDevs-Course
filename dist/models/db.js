"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Week = exports.Lecture = exports.Purchase = exports.Course = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
function backend() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect("mongodb+srv://testuserharin:hari2005@cluster0.llwnf.mongodb.net/99xDevs");
            console.log("MongoDB connected");
        }
        catch (error) {
            console.log(error);
        }
    });
}
backend();
const UserSchema = new mongoose_1.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    enrolledCourseId: { type: mongoose_1.Types.ObjectId, ref: "Course" },
});
const CourseSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String },
    courseId: { type: mongoose_1.Types.ObjectId },
    weeks: { type: mongoose_1.Types.ObjectId, ref: "Week" }
});
const PurchaseSchema = new mongoose_1.Schema({
    username: { type: String, unique: true, required: true },
    purchasedCourseId: { type: mongoose_1.Types.ObjectId, ref: "Course", required: true }
});
const LectureSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    week: { type: mongoose_1.Types.ObjectId, ref: "Week", required: true },
    thumbnailUrl: { type: String },
    notesUrl: { type: String }
});
const WeekSchema = new mongoose_1.Schema({
    title: { type: String, unique: true, required: true },
    course: { type: mongoose_1.Types.ObjectId, ref: "Course" },
    lecture: { type: mongoose_1.Types.ObjectId, ref: "Lecture" }
});
exports.User = mongoose_1.default.model("User", UserSchema);
exports.Course = mongoose_1.default.model("Course", CourseSchema);
exports.Purchase = mongoose_1.default.model("Purchase", PurchaseSchema);
exports.Lecture = mongoose_1.default.model("Lecture", LectureSchema);
exports.Week = mongoose_1.default.model("Week", WeekSchema);
