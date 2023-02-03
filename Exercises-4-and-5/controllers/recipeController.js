const Recipe = require('../models/Recipe');

const pizzaRecipe = new Recipe({
  name: 'pizza',
  ingredients: ['Store-bought pizza'],
  instructions: [
    'Heat up the oven at the temperature stated in the pizza package',
    'Put the pizza in the oven for the amount of time stated in the pizza package',
  ],
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

Recipe.findOne({ name: 'pizza' }, (err, recipe) => {
  if (err) {
    console.log(err);
  }
  if (!recipe) {
    pizzaRecipe.save(error => {
      console.log(error);
    });
  }
});

Recipe.findOne({ name: 'pasta' }, (err, recipe) => {
  if (err) {
    console.log(err);
  }
  if (!recipe) {
    pastaRecipe.save(error => {
      console.log(error);
    });
  }
});

function getRecipe(req, res) {
  if (!req || !req.params) {
    return res.status(400).send({ msg: 'Error, request cannot be empty' });
  }
  return Recipe.findOne({ name: req.params.food }, (err, recipe) => {
    if (err) {
      return res.status(500).send({ msg: 'Internal Server Error' });
    }
    if (!recipe) {
      return res.status(200).send({
        name: req.params.food,
        ingredients: [],
        instructions: [],
        categories: [],
        images: [],
      });
    }
    return res.status(200).send(recipe);
  });
}

function addRecipe(req, res, next) {
  if (!req || !req.body) {
    return res.status(400).send({ msg: 'Error, request body empty' });
  }
  if (!req.body.name) {
    return res.status(400).send({ msg: 'Error, cannot submit empty recipe' });
  }
  return Recipe.findOne({ name: req.body.name }, (err, recipe) => {
    if (err) {
      return next(err);
    }
    if (recipe) {
      return res.status(403).send({ msg: 'Error, this recipe is already in the database' });
    }
    const newRecipe = new Recipe({ ...req.body });
    return newRecipe.save(error => {
      if (error) {
        return next(error);
      }
      return res.status(200).send(newRecipe);
    });
  });
}

module.exports = {
  getRecipe,
  addRecipe,
};
