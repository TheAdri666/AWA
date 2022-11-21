const { todoList } = require('../global');
const { userPosition } = require('../global');

function findUserByName(req, res) {
  if (!req || !req.params || !req.params.id) {
    return res.status(400);
  }
  let position = userPosition(req);
  if (position !== -1) {
    return res.status(200).send(todoList[position]);
  } else {
    return res.status(200).send({ msg: "User not found"} );
  }
}

function deleteUser(req, res) {
  if (!req || !req.params || !req.params.id) {
    return res.status(400);
  }
  let position = userPosition(req);
  if (position !== -1) {
    todoList.splice(position, 1);
    return res.status(200).send({ msg: "User deleted"} );
  } else {
    res.status(200).send({ msg: "User not found"} );
  }
}

function deleteTodo(req, res) { 
  if (!req.body || req.body.number === null || req.body.number === undefined) {
    return res.status(400);
  }
  let position = userPosition(req);
  if (position !== -1) {
    let user = todoList[position];
    let taskNumber = req.body.number
    user.todos.splice(taskNumber, 1);
    return res.status(200).send({ msg: "Task deleted" });
  } else {
    return res.status(200).send({ msg: "User not found" });
  }

}

module.exports = {
  findUserByName,
  deleteUser,
  deleteTodo
};