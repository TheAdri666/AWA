const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: String,
  recipe: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe',
  },
});

module.exports = mongoose.model('Category', categorySchema);
