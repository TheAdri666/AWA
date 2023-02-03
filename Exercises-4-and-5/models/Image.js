const mongoose = require('mongoose');

const { Schema } = mongoose;

const imageSchema = new Schema({
  buffer: Buffer,
  mimetype: String,
  name: String,
  encoding: String,
  recipe: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe',
  },
});

module.exports = mongoose.model('Image', imageSchema);
