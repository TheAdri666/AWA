import mongoose from 'mongoose';

const { Schema } = mongoose;

const codeSnippetSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User', required: true
  },
  upvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  downvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  comments: [
    {
      author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      content: { type: String, required: true },
    },
  ],
});

const CodeSnippet = mongoose.model('Code Snippet', codeSnippetSchema);

export {
  CodeSnippet
}