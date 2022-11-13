let wordList = [];

function addToList(req, res) {
  const text = req?.body?.text;
  if(text) {
    wordList.push(text);
    return res.status(200).send({"list": wordList});
  }
}

module.exports = {
  addToList
};