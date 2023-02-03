const mongoose = require('mongoose');
const app = require('./app');

const PORT = 3000;
const mongoDB = process.env.MONGO_URL || 'mongodb://localhost:27017/testdb';

mongoose.connect(mongoDB, err => {
  if (err) {
    console.log('Error connecting to the database', err);
  } else {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}.`);
    });
  }
});
