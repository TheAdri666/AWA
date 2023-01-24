"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = exports.findUserByName = exports.listUsers = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
let users = [];
function generateId() {
    return users.length + 1;
}
function registerUser(req, res) {
    if (req.session.user) {
        res.redirect('/api/redirect');
        return;
    }
    const { username, password } = req.body;
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
        res.status(400).send('Username already taken');
        return;
    }
    const hashedPassword = bcryptjs_1.default.hashSync(password, 8);
    const newUser = {
        id: generateId(),
        username,
        password: hashedPassword,
    };
    users.push(newUser);
    res.status(200).send(newUser);
    return;
}
exports.registerUser = registerUser;
function loginUser(req, res) {
    if (req.session.user) {
        res.redirect('/api/redirect');
        return;
    }
    const { username, password } = req.body;
    const user = users.find((user) => user.username === username);
    if (!user) {
        res.status(401).send('Invalid credentials');
        return;
    }
    const isPasswordValid = bcryptjs_1.default.compareSync(password, user.password);
    if (!isPasswordValid) {
        res.status(401).send('Invalid credentials');
        return;
    }
    req.session.user = user;
    res.cookie('connect.sid', req.session.id);
    res.sendStatus(200);
    return;
}
exports.loginUser = loginUser;
function listUsers(req, res) {
    res.send(users);
    return;
}
exports.listUsers = listUsers;
function findUserByName(username) {
    const user = users.find((user) => user.username === username);
    return user;
}
exports.findUserByName = findUserByName;
function findUserById(id) {
    const user = users.find((user) => user.id === id);
    return user;
}
exports.findUserById = findUserById;
