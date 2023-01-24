"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTodos = exports.addTodos = void 0;
const todoLists = [];
function addTodos(req, res) {
    if (!req.session.user) {
        res.status(401).send('Unauthorized');
        return;
    }
    const { todo } = req.body;
    const userTodoList = todoLists.find((todoList) => todoList.id === req.session.user.id);
    if (userTodoList) {
        userTodoList.todos.push(todo);
        res.send(userTodoList);
        return;
    }
    const newTodoList = {
        id: req.session.user.id,
        todos: [todo]
    };
    todoLists.push(newTodoList);
    res.send(newTodoList);
    return;
}
exports.addTodos = addTodos;
function listTodos(req, res) {
    if (!req.session.user) {
        res.status(401).send({ msg: 'Unauthorized' });
        return;
    }
    const allTodos = [];
    for (const list of todoLists) {
        allTodos.push(list);
    }
    res.send(allTodos);
    return;
}
exports.listTodos = listTodos;
