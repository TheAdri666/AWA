import mongoose from "mongoose";

const { Schema } = mongoose;

const todoListModel = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  items: [String]
});

const TodoList = mongoose.model('Todo', todoListModel);

export {
  TodoList
}
