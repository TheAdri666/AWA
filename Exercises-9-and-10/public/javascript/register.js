const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const registerButton = document.getElementById('register-button');

function removePreviousErrorMessages() {
  const errorMessages = document.querySelectorAll('.error');
  errorMessages.forEach(e => e.remove());
}

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

  let resOk = true;

  fetch(url, fetchOptions)
    .then((res) => {
      if (!res.ok) {
        resOk = false;
      }
      return res.json();
     })
    .then((data) => {
      if (resOk) {
        window.location.href = 'http://localhost:3000/login.html'
      } else {
        if (data.errors) {
          removePreviousErrorMessages();        
          data.errors.forEach(error => {
            if (error.param === 'email') {
              const invalidEmailParagraph = document.createElement('p');
              invalidEmailParagraph.innerHTML = 'Please, insert a valid email address';
              invalidEmailParagraph.setAttribute('class', 'error');
              emailInput.after(invalidEmailParagraph);
            }
            if (error.param === 'password') {
              const invalidPasswordParagraph = document.createElement('p');
              invalidPasswordParagraph.innerHTML = 'Password is not strong enough';
              invalidPasswordParagraph.setAttribute('class', 'error');
              passwordInput.after(invalidPasswordParagraph);
            }
          });
        } else if (data.email) {
          const duplicateEmailParagraph = document.createElement('p');
          duplicateEmailParagraph.innerHTML = 'Email already in use';
          duplicateEmailParagraph.setAttribute('class', 'error');
          emailInput.after(duplicateEmailParagraph);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    })
  
}

registerButton.addEventListener('click', register);
