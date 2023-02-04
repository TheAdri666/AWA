import mongoose from "mongoose";

const { Schema } = mongoose;

const todoListSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  items: [String]
});

const TodoList = mongoose.model('TodoList', todoListSchema);

export {
  TodoList
}
