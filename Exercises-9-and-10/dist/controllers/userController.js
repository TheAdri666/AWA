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
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const express_validator_1 = require("express-validator");
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userExists = yield User_1.User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(403).send({ email: "Email already in use." });
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, salt);
        const user = new User_1.User({
            email: req.body.email,
            password: hashedPassword,
        });
        try {
            const savedUser = yield user.save();
            res.send(savedUser);
        }
        catch (err) {
            res.status(400).send(err);
        }
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send("Email or password is incorrect");
        }
        const validPassword = yield bcryptjs_1.default.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).send("Email or password is incorrect");
        }
        const jwtPayload = {
            id: user._id,
            email: user.email
        };
        const token = jsonwebtoken_1.default.sign(jwtPayload, process.env.SECRET, { expiresIn: '1d' });
        res.json({ token });
    });
}
exports.login = login;
