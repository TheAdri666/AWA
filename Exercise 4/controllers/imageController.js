const imageList = [];

function addImages(req, res) {
  if (!req || !req.body) {
    return res.status(400).send({ msg: 'Error' });
  }
  const { images } = req.body;
  if (images === undefined || images === null) {
    return res.status(400).send({ msg: 'Image was not received correctly' });
  }
  imageList.push(images);
  return res.status(200).send({ msg: 'Image received successfully' });
}

module.exports = {
  addImages,
};
