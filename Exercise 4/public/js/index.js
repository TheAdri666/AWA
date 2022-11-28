const recipeList = document.getElementById('recipe-list');
const ingredientButton = document.getElementById('add-ingredient');
const instructionButton = document.getElementById('add-instruction');
const submitButton = document.getElementById('submit');
// eslint-disable-next-line no-unused-vars
const ingredientInput = document.getElementById('ingredients-text');
// eslint-disable-next-line no-unused-vars
const instructionInput = document.getElementById('instructions-text');
// eslint-disable-next-line no-unused-vars
const nameInput = document.getElementById('name-text');
const imageInput = document.getElementById('image-input');

function beautifyOutput(dataStream) {
  let output = '';
  const breakers = ['{', '}', '[', ']', ','];
  [...dataStream].forEach((c) => {
    output = output.concat(c);
    if (breakers.includes(c)) {
      output = output.concat('<br>');
    }
  });
  return output;
}

function fetchRecipe(food) {
  fetch(`http://localhost:3000/recipe/${food}`, {
    method: 'GET',
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then((data) => {
      const listItem = document.createElement('div');
      listItem.setAttribute('class', 'list-item');
      const output = beautifyOutput(JSON.stringify(data));
      listItem.innerHTML = output;
      recipeList.appendChild(listItem);
    });
}

function getEmptyRecipe() {
  return {
    name: '',
    ingredients: [],
    instructions: [],
  };
}

let recipe = getEmptyRecipe();

function addIngredient() {
  recipe.ingredients.push(ingredientInput.value);
  console.log('Ingredient added: ', ingredientInput.value);
}

function addInstruction() {
  recipe.instructions.push(instructionInput.value);
  console.log('Instruction added: ', instructionInput.value);
}
function addRecipe() {
  recipe.name = nameInput.value;
  const body = recipe;
  fetch('http://localhost:3000/recipe/', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then(data => {
      console.log('Add recipe data', data);
    });
  recipe = getEmptyRecipe();
}

function sendImages() {
  const currentFiles = imageInput.files;
  const formData = new FormData();
  for (const file of currentFiles) {
    formData.append('images', file);
  }
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3000/images');
  xhr.send(formData);
  xhr.onerror = () => {
    throw new Error('Request failed');
  };
  xhr.onload = () => {
    console.log('Request succeeded');
  };
}

recipeList.setAttribute('id', 'recipe-list');
ingredientButton.addEventListener('click', addIngredient);
instructionButton.addEventListener('click', addInstruction);
submitButton.addEventListener('click', addRecipe);
submitButton.addEventListener('click', sendImages);

fetchRecipe('pizza');
fetchRecipe('pasta');
