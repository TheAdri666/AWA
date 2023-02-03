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
  registerLink.href = 'http://localhost:3000/register.html';
  registerLink.innerHTML = 'Register';

  const loginLink = document.createElement('a');
  loginLink.href = 'http://localhost:3000/login.html';
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
  logoutButton.addEventListener('click', logout);

  document.body.appendChild(emailParagraph);
  document.body.appendChild(logoutButton);
}

if (isLoggedIn) {
  displayEmailAndLogoutElements();
} else {
  displayRegisterAndLoginElements();
}
