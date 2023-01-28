"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const todoListRouter_1 = __importDefault(require("./routers/todoListRouter"));
const privateRouter_1 = __importDefault(require("./routers/privateRouter"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/user', userRouter_1.default);
app.use('/api/todos', todoListRouter_1.default);
app.use('/api/private', privateRouter_1.default);
exports.default = app;
