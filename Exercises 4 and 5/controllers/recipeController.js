const Recipe = require('../models/Recipe');

const pizzaRecipe = new Recipe({
  name: 'pizza',
  ingredients: ['Store-bought pizza'],
  instructions: [
    'Heat up the oven at the temperature stated in the pizza package',
    'Put the pizza in the oven for the amount of time stated in the pizza package',
  ],
});
pizzaRecipe.save(err => {
  if (err) {
    console.log(err);
  }
});

const pastaRecipe = new Recipe({
  name: 'pasta',
  ingredients: ['Pasta', 'Onion', 'Garlic', 'Tomato Sauce', 'Cheese', 'Herbs'],
  instructions: [
    'Boil a pot of water',
    'Put pasta in boiling water for tht time stated in the pasta bag',
    'Chop up onion and garlic', 'Stir fry onions and garlic until golden',
    'Add herbs and cheese to the stir fry and wait until the cheese melts',
    'Strain the pasta', 'Add the stir fry and tomato sauce to the pasta',
  ],
});

pastaRecipe.save(err => {
  if (err) {
    console.log(err);
  }
});

/* function getIndex(req) {
  let index = -1;
  const { food } = req.params;
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].name === food) {
      index = i;
      break;
    }
  }
  return index;
} */

function getRecipe(req, res) {
  if (!req || !req.params) {
    return res.status(400).send({ msg: 'Error, request cannot be empty' });
  }
  return Recipe.findOne({ name: req.params.food }, (err, recipe) => {
    if (err) {
      return res.status(500).send({ msg: 'Internal Server Error' });
    }
    if (!recipe) {
      console.log('no recipe');
      return res.status(200).send({
        name: req.params.food,
        ingredients: [],
        instructions: [],
      });
    }
    return res.status(200).send(recipe);
  });
}

/* function isValid(recipe) {
  let value = true;
  if (
    recipe.name === null || recipe.name === undefined
  || recipe.ingredients === null || recipe.ingredients === undefined
  || recipe.instructions === null || recipe.instructions === undefined
  || typeof recipe.name !== 'string'
  || typeof recipe.ingredients !== 'object'
  || typeof recipe.instructions !== 'object') {
    value = false;
  }
  return value;
} */

function addRecipe(req, res, next) {
  if (!req || !req.body) {
    return res.status(400).send({ msg: 'Error, request body empty' });
  }
  if (!req.body.name) {
    return res.status(400).send({ msg: 'Error, cannot submit empty recipe' });
  }
  return Recipe.findOne({ ...req.body }, (err, recipe) => {
    if (err) {
      return next(err);
    }
    if (recipe) {
      return res.status(403).send({ msg: 'Error, this recipe is already in the database' });
    }
    const newRecipe = new Recipe({ ...req.body });
    return newRecipe.save(error => {
      if (error) {
        return next(res);
      }
      return res.status(200).send(newRecipe);
    });
  });
}

module.exports = {
  getRecipe,
  addRecipe,
};
