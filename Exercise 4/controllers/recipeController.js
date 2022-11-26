const recipes = [];

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
  return res.status(200).send(recipes[foodIndex]);
}

module.exports = {
  getRecipe,
};
