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
const router = express_1.default.Router();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || password) {
        res.status(400).json({ message: " input fields cant be empty" });
        return;
    }
    try {
        const Finduser = yield db_1.User.findOne({
            username: username
        });
        if (Finduser) {
            res.status(400).json({ message: "user already exist" });
            return;
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedpass = bcrypt_1.default.hash(password, salt);
        const newUser = db_1.User.create({
            username: username,
            password: hashedpass
        });
        res.status(200).json({ message: "user signedup" });
    }
    catch (e) {
        console.log(e);
    }
}));
router.post("/signin", (req, res) => {
});
router.post("/home", (req, res) => {
});
router.post("/course", (req, res) => {
});
router.post("/course/week", (req, res) => {
});
router.post("/week/content", (req, res) => {
});
exports.default = router;
