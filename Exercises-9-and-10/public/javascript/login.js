const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const loginButton = document.getElementById('login-button');

function login() {
  const email = emailInput.value;
  const password = passwordInput.value;

  const url = new URL('http://localhost:3000/api/user/login');

  const headers = new Headers();
  headers.append('Content-Type', 'application/json; charset=utf-8');

  const body = {
    email,
    password
  }

  const fetchOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
    redirect: 'follow'
  }

  fetch(url, fetchOptions)
  .then((res) => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  })
  .then((data) => {
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
      window.location.href = 'http://localhost:3000/'
    }
  });

}

loginButton.addEventListener('click', login)