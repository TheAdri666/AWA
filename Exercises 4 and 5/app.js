const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer();
const recipeRouter = require('./routes/recipeRouter');
const imageRouter = require('./routes/imageRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(upload.array());

app.use('/recipe', recipeRouter);
app.use('/images', imageRouter);

app.use(express.static('public'));

module.exports = app;
