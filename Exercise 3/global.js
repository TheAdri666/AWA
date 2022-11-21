let todoList = [];

function userPosition(req) {
  let position = -1;
  for (let i = 0; i < todoList.length; i++) {
    if (req.body.name === todoList[i].name || req.params.id === todoList[i].name) {
      position = i;
      break;
    }
  }
  return position;
}

module.exports = {
  todoList,
  userPosition
};