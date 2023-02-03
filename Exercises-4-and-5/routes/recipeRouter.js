const router = require('express').Router();
const RecipeCtrl = require('../controllers/recipeController');

router
  .route('/')
  .post(RecipeCtrl.addRecipe);

router
  .route('/:food')
  .get(RecipeCtrl.getRecipe);

module.exports = router;
