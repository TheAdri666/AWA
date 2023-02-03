function helloWorld(req, res) {
  return res.status(200).send({
    msg: "Hello World"
  });
}

module.exports = {
  helloWorld
};