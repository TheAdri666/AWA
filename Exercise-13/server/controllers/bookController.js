const Book = require('../models/Book');

async function saveBook(req, res) {
  try {
    const { author, name, pages } = req.body;
    const book = new Book({ author, name, pages });
    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving book to database');
  }
}

async function getBook(req, res) {
  const { name } = req.params
  const book = await Book.findOne({ name });
  if (!book) {
    return res.status(400).send({ msg: 'No book found with that name'});
  }
  return res.send(book);
}

module.exports = {
  saveBook,
  getBook
}