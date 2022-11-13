function sum(req, res) {
  let sum = 0;
  if(!req || !req.body || !req.body.numbers) {
    return res.status(400);
  }
  const numbers = req.body.numbers;
  for (const char of numbers) {
    if (char !== " " && !isNaN(char)) {
      sum += parseInt(char);
    }
  }
  return res.status(200).send({"sum": sum});
}

module.exports = {
  sum
};