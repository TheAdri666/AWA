var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const bookRouter = require('./routes/books');

var app = express();

const mongoDB = process.env.MONGO_URL || 'mongodb://localhost:27017/testdb';

mongoose.connect(mongoDB, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/book', bookRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve("..", "client", "build")));
    app.get("*", (req, res) => res.sendFile(path.resolve("..", "client", "build", "index.html"))); 
} else if (process.env.NODE_ENV === "development") { 
  const corsOptions = { 
    origin: "http://localhost:3000", 
    optionsSuccessStatus: 200,  
  };
  app.use(cors(corsOptions));
}
   
module.exports = app;
