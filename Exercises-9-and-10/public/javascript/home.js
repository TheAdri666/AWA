function checkLoggedIn() {
  let isLoggedIn = false;
  if (localStorage.getItem('auth_token')) {
    isLoggedIn = true;
  }
  return isLoggedIn;
}

const isLoggedIn = checkLoggedIn();

function displayRegisterAndLoginElements() {
  const linksDiv = document.getElementById('links');
  const registerLink = document.createElement('a');
  registerLink.href = '/register.html';
  registerLink.innerHTML = 'Register';

  const loginLink = document.createElement('a');
  loginLink.href = '/login.html';
  loginLink.innerHTML = 'Login';

  linksDiv.appendChild(registerLink);
  linksDiv.appendChild(loginLink);
}

function decodeEmailFromJwt(token) {
  const base64Payload = token.split('.')[1];
  const jsonPayload = JSON.parse(atob(base64Payload));
  const { email } = jsonPayload;
  return email
}

function logout() {
  localStorage.removeItem('auth_token');
  location.reload();
}

function displayEmailAndLogoutElements() {
  const email = decodeEmailFromJwt(localStorage.getItem('auth_token'));

  const emailParagraph = document.createElement('p');
  emailParagraph.innerHTML = email;

  const logoutButton = document.createElement('input');
  logoutButton.type = 'submit';
  logoutButton.value = 'Logout'
  logoutButton.setAttribute('id', 'logout');
  logoutButton.addEventListener('click', logout);

  document.body.appendChild(emailParagraph);
  document.body.appendChild(logoutButton);
}

function addTodo() {
  const url = new URL('http://localhost:3000/api/todos');
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);
  headers.append('Content-Type', 'application/json');

  const body = JSON.stringify({
    'items': [ addItemInput.value ]
  });

  const requestOptions = {
    method: 'POST',
    headers,
    body,
    redirect: 'follow'
  };

  fetch(url, requestOptions)
    .then((res) => {
    if(!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
    })
    .then((data) => {
      console.log(data);
    });
}

const addItemInput = document.getElementById('add-item');
addItemInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

function showTodos() {
  const todosDiv = document.getElementById('todos');

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);

  const requestOptions = {
    method: 'GET',
    headers,
    redirect: 'follow'
  };

  fetch('http://localhost:3000/api/todos', requestOptions)
    .then((res) =>{
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then((todoList) => {
      const { items } = todoList;
      items.forEach((item) => {
        itemParagraph = document.createElement('p');
        itemParagraph.innerHTML = item;
        todosDiv.appendChild(itemParagraph);
      })
    });
}

if (isLoggedIn) {
  displayEmailAndLogoutElements();
  showTodos();
} else {
  displayRegisterAndLoginElements();
}
