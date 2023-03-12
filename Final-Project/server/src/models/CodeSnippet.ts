import mongoose from 'mongoose';

const { Schema } = mongoose;

const codeSnippetSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  content: {
    type: String,
    required: true,
    index: true
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

codeSnippetSchema.index({ title: 'text', content: 'text' });

const CodeSnippet = mongoose.model('Code Snippet', codeSnippetSchema);

export default CodeSnippet;
