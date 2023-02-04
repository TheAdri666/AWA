"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoList = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const todoListSchema = new Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
    items: [String]
});
const TodoList = mongoose_1.default.model('TodoList', todoListSchema);
exports.TodoList = TodoList;
