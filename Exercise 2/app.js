const express = require('express');
const app = express();
const helloRouter = require('./routers/helloRouter');
const echoRouter = require('./routers/echoRouter');
const sumRouter = require('./routers/sumRouter');
const listRouter = require('./routers/listRouter')

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.urlencoded({extended: true}));

app.use('/hello', helloRouter);
app.use('/echo', echoRouter);
app.use('/sum', sumRouter);
app.use('/list', listRouter);

app.use(express.static('public'));

module.exports = app;