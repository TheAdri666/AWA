"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTodos = exports.addTodos = void 0;
let todoLists = [];
function addTodos(req, res) {
    if (!req.session.user) {
        res.status(401).send('Unauthorized');
        return;
    }
    const { todos } = req.body;
    const userTodoList = todoLists.find((todoList) => todoList.id === req.session.user.id);
    if (userTodoList) {
        userTodoList.todos.push(...todos);
        res.send(userTodoList);
    }
    else {
        const newTodoList = {
            id: req.session.user.id,
            todos
        };
        todoLists.push(newTodoList);
        res.send(newTodoList);
    }
}
exports.addTodos = addTodos;
function listTodos(req, res) {
    if (!req.session.user) {
        res.status(401).send({ msg: 'Unauthorized' });
        return;
    }
    const todos = [];
    for (const list of todoLists) {
        for (const todo of list.todos) {
            todos.push(todo);
        }
        res.status(200).send({ todos });
        return;
    }
}
exports.listTodos = listTodos;
