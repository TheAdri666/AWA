const express = require('express');
const app = express();
const helloRouter = require('./routes/helloRouter');
const echoRouter = require('./routes/echoRouter');
const sumRouter = require('./routes/sumRouter');
const listRouter = require('./routes/listRouter')

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.urlencoded({extended: true}));

app.use('/hello', helloRouter);
app.use('/echo', echoRouter);
app.use('/sum', sumRouter);
app.use('/list', listRouter);

app.use(express.static('public'));

module.exports = app;