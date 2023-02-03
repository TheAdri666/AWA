const nameInput = document.getElementById('input-name');
const taskInput = document.getElementById('input-task');
const button = document.getElementById('submit-data');
const list = document.getElementById('list');
const lastMessage = document.getElementById('last-message');
const searchInput = document.getElementById('search-name');
const searchButton = document.getElementById('search');

function submitTodo() {
  const name = nameInput.value;
  const todo = taskInput.value; 
  const body = {
    name: name,
    todo: todo
  };
  fetch('http://localhost:3000/todo', {
    method: 'POST',
    headers: {
      "Content-type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(body)
  })
  .then(res => {
    if(!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  })
  .then(data => {
    lastMessage.innerHTML = data.msg;
    list.innerHTML = prettyPrint(data.list);
  });
}

function prettyPrint(list) {
  let formattedString = ""
  for (const obj of list) {
    let todos = ""
    for (const todo of obj.todos) {
      todos = todos.concat(`${todo}, `);
    }
    todos = todos.slice(0, -2);
    if(todos.length !== 0) {
      todos = todos.concat('.');
    }
    formattedString = formattedString.concat(`Name: ${obj.name}<br>TODOs: ${todos}<br><br>`);
  }
  return formattedString;
}

button.addEventListener('click', submitTodo);

function searchUser() {
  let user = searchInput.value;
  fetch(`http://localhost:3000/user/${user}`, {
    method: 'GET'
  })
  .then(res => {
    if(!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  })
  .then(data => {
    formatSearchSection(user, data);
  });
}

function formatSearchSection(user, data) {
  let checkedElement = document.getElementById('user-div-wrapper');
    if (checkedElement) {
      checkedElement.remove();
    }
    let userDivWrapper = document.createElement('div');
    userDivWrapper.setAttribute('id', "user-div-wrapper");
    let header2Text = document.createElement('h2');
    header2Text.innerHTML = `User ${user}:`
    userDivWrapper.appendChild(header2Text);
    if (!data.name) {
      let notFoundParagraph = document.createElement('p');
      notFoundParagraph.innerHTML =`The user ${user} was not found`
      userDivWrapper.appendChild(notFoundParagraph);
    }
    else {
      let userDiv = document.createElement('div');
      userDiv.innerHTML = prettyPrint([data]);
      userDivWrapper.appendChild(userDiv)
      let deleteButton = document.createElement('button');
      deleteButton.innerHTML = "Delete User";
      deleteButton.setAttribute('id', 'delete-user')
      userDivWrapper.appendChild(deleteButton);
      deleteButton.addEventListener('click', () => {
        deleteUser(user)
      });
      for (let i = 0; i < data.todos.length; i++) {
        let deleteTaskButton = document.createElement('button');
        deleteTaskButton.innerHTML = `Delete task ${i + 1}`;
        deleteTaskButton.setAttribute('class', 'delete-task');
        deleteTaskButton.addEventListener('click', () => {
          deleteTodo(user, i);
        });
        userDivWrapper.appendChild(deleteTaskButton);
      }
    }
    document.body.appendChild(userDivWrapper);
}

function deleteUser(user) {
  fetch(`http://localhost:3000/user/${user}`, {
    method: 'DELETE'
  })
  .then(res => {
    if(!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  })
  .then(data => {
    let userDeleted = document.createElement('p');
    userDeleted.innerHTML = `User ${user} deleted.`;
    userDeleted.setAttribute('id', 'userDeleted');
    let checkedElement = document.getElementById('userDeleted');
    if(checkedElement) {
      checkedElement.remove();
    }
    document.body.appendChild(userDeleted);
  });
}

function deleteTodo(user, taskNumber) {
  const body = {
    number: taskNumber,
    name: searchInput.value //DELETE(`
  };
  fetch('http://localhost:3000/user', {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body)
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  })
  .then(data => {
    console.log(data);
  });
}

searchButton.addEventListener('click', searchUser);