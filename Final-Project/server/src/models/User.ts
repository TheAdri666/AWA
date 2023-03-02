import mongoose from 'mongoose';
import { CodeSnippet } from './CodeSnippet'

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: 'default-profile-picture.png',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  codeSnippets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CodeSnippet'
    }
  ]
});

const User = mongoose.model('User', userSchema);

export {
  User
}
