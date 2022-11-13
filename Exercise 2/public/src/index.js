const input = document.getElementById('input-text');
const button = document.getElementById('submit-data');
const list = document.getElementById('list');

button.addEventListener('click', fetchList);

function fetchList() {
  const text = input.value;
  const body = {
    "text": text
  }
  fetch('http://localhost:3000/list', {
    method: 'POST',
    headers: {
      "Content-type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(body)
  })
  .then(res => {
    if(!res.ok) {
      throw Error(res.status);
    }
    return res.json();
  })
  .then(data => {
    list.innerText = data.list;
  });
}