"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePassport = void 0;
const passport_local_1 = require("passport-local");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userController_1 = require("./controllers/userController");
function initializePassport(passport) {
    const authenticateUser = (username, password, done) => {
        const user = (0, userController_1.findUserByName)(username);
        if (!user) {
            return done(null, false, { message: 'Invalid credentials' });
        }
        if (bcryptjs_1.default.compareSync(password, user.password)) {
            return done(null, user);
        }
        else {
            return done(null, false, { message: 'Invalid credentials' });
        }
        ;
    };
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        const user = (0, userController_1.findUserById)(id);
        done(null, user);
    });
    passport.use(new passport_local_1.Strategy(authenticateUser));
}
exports.initializePassport = initializePassport;
