const recipes = [
  {
    name: 'pizza',
    ingredients: ['Store-bought pizza'],
    instructions: [
      'Heat up the oven at the temperature stated in the pizza package',
      'Put the pizza in the oven for the amount of time stated in the pizza package',
    ],
  },
  {
    name: 'pasta',
    ingredients: ['Pasta', 'Onion', 'Garlic', 'Tomato Sauce', 'Cheese', 'Herbs'],
    instructions: [
      'Boil a pot of water',
      'Put pasta in boiling water for tht time stated in the pasta bag',
      'Chop up onion and garlic', 'Stir fry onions and garlic until golden',
      'Add herbs and cheese to the stir fry and wait until the cheese melts',
      'Strain the pasta', 'Add the stir fry and tomato sauce to the pasta',
    ],
  },
];

function getIndex(req) {
  let index = -1;
  const { food } = req.params;
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].name === food) {
      index = i;
      break;
    }
  }
  return index;
}

function getRecipe(req, res) {
  if (!req || !req.params) {
    return res.status(400).send({ msg: 'Error' });
  }
  const foodIndex = getIndex(req);
  if (foodIndex === -1) {
    return res.status(200).send({ msg: 'Recipe does not exist in database' });
  }
  return res.status(200).json(recipes[foodIndex]);
}

function isValid(recipe) {
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
}

function addRecipe(req, res) {
  if (!req || !req.body) {
    return res.status(400).send({ msg: 'Error' });
  }
  const recipe = { ...req.body };
  if (!recipe || !isValid(recipe)) {
    return res.status(200).send({ msg: 'Recipe can\'t be empty' });
  }
  recipes.push(recipe);
  return res.status(200).send(recipe);
}

module.exports = {
  getRecipe,
  addRecipe,
};
