const Image = require('../models/Image');
const Recipe = require('../models/Recipe');

function addImages(req, res, next) {
  if (!req || !req.files || !req.body) {
    return res.status(400).send({ msg: 'Error' });
  }
  const images = req.files;
  const { recipe } = req.body;
  if (images === undefined || images === null) {
    return res.status(400).send({ msg: 'Image was not received correctly' });
  }
  for (const file of images) {
    const image = new Image({
      buffer: file.buffer,
      name: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
    });
    image.save((err, result) => {
      if (err) {
        next(err);
      }
      Recipe.findOne({ name: recipe })
        .exec()
        .then((data) => {
          data.images.push(result._id);
          data.save();
        });
    });
  }
  return res.status(200).send({ msg: 'Images received successfully' });
}

function getImageById(req, res, next) {
  if (!req || !req.params || req.params.id === undefined || req.params.id === null) {
    res.status(400).send({ msg: 'Error, request is not valid' });
  }
  Image.findById(req.params.id, (err, image) => {
    if (err) {
      return next(err);
    }
    if (!image) {
      return res.status(404).send({ msg: 'Image not found' });
    }
    const decodedImage = {
      name: image.name,
      mimetype: image.mimetype,
      encoding: image.encoding,
      _id: image._id,
      __v: image.__v,
      buffer: Buffer.from(image.buffer).toString('base64'),
    };
    return res.status(200).set('Content-type', 'image/jpeg').set('Content-disposition', 'inline').send(decodedImage);
  });
}

module.exports = {
  addImages,
  getImageById,
};
