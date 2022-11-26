const router = require('express').Router();
const RecipeCtrl = require('../controllers/recipeController');

router
  .route('/:food')
  .get(RecipeCtrl.getRecipe);

router
  .route('/')
  .get((req, res) => res.send({ msg: 'test' }));

module.exports = router;
