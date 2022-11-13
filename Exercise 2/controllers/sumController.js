function sum(req, res) {
  let sum = 0;
  const numbers = req?.body?.numbers;
  if(numbers) {
    for (const char of numbers) {
      if (char !== " " && !isNaN(char)) {
        sum += parseInt(char);
      }
    }
  }
  return res.status(200).send({"sum": sum});
}

module.exports = {
  sum
};