import mongoose from 'mongoose';
import app from './app';

const PORT: number = 3000;
const mongoDB: string = process.env.MONGO_URL || 'mongodb://localhost:27017/testdb';

mongoose
  .connect(mongoDB)
  .then(() => app.listen(PORT, () => console.log(`App listening on port ${PORT}.`)))
  .catch((err: mongoose.Error) => console.error('Could not connect to MongoDB...', err));
  