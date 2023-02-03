const Category = require('../models/Category');

function addCategory(req, res, next) {
  if (!req || !req.body) {
    return res.status(400).send({ msg: 'Error, request cannot be empty' });
  }
  if (!req.body.name) {
    return res.status(400).send({ msg: 'Category needs to have a name' });
  }
  return Category.findOne({ ...req.body }, (err, category) => {
    if (err) {
      return next(err);
    }
    if (category) {
      return res.status(403).send({ msg: 'Error, this category is already in the database' });
    }
    const newCategory = new Category({ ...req.body });
    return newCategory.save(error => {
      if (error) {
        return next(res);
      }
      return res.status(200).send(newCategory);
    });
  });
}

function getCategory(req, res, next) {
  if (!req || !req.params) {
    return res.status(400).send({ msg: 'Error, request cannot be empty' });
  }
  return Category.findOne({ name: req.params.name }, (err, category) => {
    if (err) {
      return next(err);
    }
    if (!category) {
      res.status(404).send({ msg: 'No category found' });
    }
    return res.status(200).send(category);
  });
}

function getAllCategories(req, res, next) {
  if (!req) {
    return res.status(400).send({ msg: 'Empty request' });
  }
  return Category.find({}, (err, categories) => {
    if (err) {
      return next(err);
    }
    if (!categories) {
      return res.status(404).send({ msg: 'No categories found in database' });
    }
    return res.status(200).send(categories);
  });
}

module.exports = {
  addCategory,
  getCategory,
  getAllCategories,
};
