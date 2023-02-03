"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const todoRouter_1 = __importDefault(require("./routers/todoRouter"));
const secretRouter_1 = __importDefault(require("./routers/secretRouter"));
const passport_1 = __importDefault(require("passport"));
const passportConfig_1 = require("./passportConfig");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
(0, passportConfig_1.initializePassport)(passport_1.default);
app.use((0, express_session_1.default)({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/api/redirect', (req, res) => {
    res.send({ msg: 'You were redirected here for some reason. Go back!' });
});
app.use('/api/user', userRouter_1.default);
app.use('/api/todos', todoRouter_1.default);
app.use('/api/secret', secretRouter_1.default);
exports.default = app;
