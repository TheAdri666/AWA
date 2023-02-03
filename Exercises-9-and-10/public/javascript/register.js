const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const registerButton = document.getElementById('register-button');

function register() {
  const email = emailInput.value;
  const password = passwordInput.value;

  const url = new URL('http://localhost:3000/api/user/register');

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
  .then((user) => {
    console.log(user);
    window.location.href = 'http://localhost:3000/login.html'
  });
}

registerButton.addEventListener('click', register);
