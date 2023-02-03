function echo(req, res) {
  return res.status(200).send(req.params);
}

module.exports = {
  echo
};