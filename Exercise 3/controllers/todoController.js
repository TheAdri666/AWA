const { todoList } = require('../global');
const { userPosition } = require('../global');

function addTodo(req, res) {
  if (!req || !req.body || !req.body.name || !req.body.todo) {
    return res.status(400);
  }
  let position = userPosition(req)
  if (position !== -1) {
    todoList[position].todos.push(req.body.todo);
    return res.status(200).send({ 
      msg: "Todo added",
      list: todoList 
    });
  } else {
    todoList.push({
      name: req.body.name,
      todos: [req.body.todo]
    });
    return res.status(200).send({
      msg: "User added",
      list: todoList 
    });
  }
}

module.exports = {
  addTodo
}