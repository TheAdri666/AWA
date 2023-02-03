let wordList = [];

function addToList(req, res) {
  if(!req || !req.body || !req.body.text) {
    return res.status(400);
  }
  const text = req.body.text;
  wordList.push(text);
  return res.status(200).send({"list": wordList});
}

module.exports = {
  addToList
};