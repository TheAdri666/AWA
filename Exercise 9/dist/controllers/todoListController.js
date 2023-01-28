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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTodos = void 0;
const todoListModel_1 = require("../models/todoListModel");
const userModel_1 = require("../models/userModel");
function addTodos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.token;
        const user = yield userModel_1.User.findOne({ email: token.email });
        if (!user) {
            res.status(400).send({ msg: 'Something went wrong' });
        }
        const { items } = req.body;
        try {
            const todoList = yield todoListModel_1.TodoList.findOne({ email: user.email });
            if (todoList) {
                todoList.items = [...todoList.items, ...items];
                yield todoList.save();
            }
            else {
                const newTodoList = new todoListModel_1.TodoList({ user, items });
                yield newTodoList.save();
            }
            res.json({ message: 'Todo list created/updated successfully' });
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating/updating todo list' });
        }
    });
}
exports.addTodos = addTodos;
