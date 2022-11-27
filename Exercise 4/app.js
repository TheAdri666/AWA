const express = require('express');

const app = express();
const recipeRouter = require('./routes/recipeRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.use('/recipe', recipeRouter);

app.use(express.static('public'));

module.exports = app;
