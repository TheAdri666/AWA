const { Schema } = require('mongoose');

const bookSchema = new Schema({
  author: String,
  name: String,
  pages: Number,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
