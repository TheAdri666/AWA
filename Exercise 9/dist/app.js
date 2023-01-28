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
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const userModel_1 = require("./models/userModel");
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.urlencoded({ extended: true }));
const jwtOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secretkey",
    passReqToCallback: true
};
passport_1.default.use(new passport_jwt_1.Strategy(jwtOptions, (req, payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the user specified in token
        const user = yield userModel_1.User.findById(payload._id);
        if (!user) {
            return done(null, false);
        }
        req.user = user;
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
})));
const authenticateJWT = (req, res, next) => {
    passport_1.default.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }
        req.user = user;
        next();
    })(req, res, next);
};
app.use('/api/user', userRouter_1.default);
exports.default = app;
