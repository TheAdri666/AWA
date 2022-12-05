const mongoose = require('mongoose');

const { Schema } = mongoose;

const recipeSchema = new Schema({
  name: String,
  ingredients: [String],
  instructions: [String],
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }],
  images: [{
    type: Schema.Types.ObjectId,
    ref: 'Image',
  }],
});

module.exports = mongoose.model('Recipe', recipeSchema);
