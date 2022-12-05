const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer();
const recipeRouter = require('./routes/recipeRouter');
const imageRouter = require('./routes/imageRouter');
const categoryRouter = require('./routes/categoryRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(upload.any());

app.use('/recipe', recipeRouter);
app.use('/images', imageRouter);
app.use('/category', categoryRouter);

app.use(express.static('public'));

module.exports = app;
