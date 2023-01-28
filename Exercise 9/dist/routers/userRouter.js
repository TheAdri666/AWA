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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserCtrl = __importStar(require("../controllers/userController"));
const express_validator_1 = require("express-validator");
const userRouter = (0, express_1.Router)();
userRouter
    .route('/register')
    .post([
    (0, express_validator_1.check)("email", "Please enter a valid email address").isEmail(),
    (0, express_validator_1.check)("password", "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol: ~`!@#$%^&*()-_+={}[]|;:\"<>,./?").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#\$%\^&\*\(\)-_\+=\{\}\[\]\|;:"<>,\.\/\?]).{8,}$/)
], UserCtrl.register);
userRouter
    .route('/login')
    .post(UserCtrl.login);
exports.default = userRouter;
