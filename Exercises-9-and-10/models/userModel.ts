import mongoose from "mongoose";

const { Schema } = mongoose;

const userModel = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userModel);

export {
  User
}
