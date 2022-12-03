const mongoose = require('mongoose');

const { Schema } = mongoose;

const recipeSchema = new Schema({
  name: String,
  ingredients: [String],
  instructions: [String],
});

module.exports = mongoose.model('Recipe', recipeSchema);
