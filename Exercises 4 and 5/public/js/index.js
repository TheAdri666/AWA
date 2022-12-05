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
const searchInput = document.getElementById('search');
const searchButton = document.querySelector('.label-icon');
const dietSelector = document.getElementById('diet-selector');
const imageBox = document.getElementById('images');
const categories = [];
const checkboxes = [];

function commaToBr(string) {
  let output = '';
  for (const c of string) {
    if (c !== ',') {
      output = output.concat(c);
    } else {
      output = output.concat('<br>');
    }
  }
  return output;
}

async function fetchImages(images) {
  const result = [];
  for (const image of images) {
    await fetch(`http://localhost:3000/images/${image}`, {
      method: 'GET',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(data => {
        result.push(data);
      });
  }
  return result;
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
    .then(async (data) => {
      const listItem = document.createElement('div');
      listItem.setAttribute('class', 'list-item');
      listItem.innerHTML = `<h3>Name</h3><p>${commaToBr(data.name)}<p><br><h3>Ingredients</h3><p>${commaToBr(data.ingredients.toString())}</p><br><h3>Instructions</h3><p>${commaToBr(data.instructions.toString())}</p><br>`;
      recipeList.appendChild(listItem);
      const images = await fetchImages(data.images);
      for (const image of images) {
        const { buffer } = image;
        const imageElement = document.createElement('img');
        imageElement.src = `data:image/jpeg;base64,${buffer}`;
        imageBox.append(imageElement);
      }
    });
}

function getEmptyRecipe() {
  return {
    name: '',
    ingredients: [],
    instructions: [],
    categories: [],
    images: [],
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

function getCategories() {
  const categoryIds = [];
  for (const checkbox of checkboxes) {
    if (checkbox.checked) {
      categoryIds.push(checkbox.id);
    }
  }
  recipe.categories = categoryIds;
}

function addRecipe() {
  recipe.name = nameInput.value;
  getCategories();
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
  console.log(body);
  recipe = getEmptyRecipe();
}

function sendImages() {
  const currentFiles = imageInput.files;
  const formData = new FormData();
  for (const file of currentFiles) {
    formData.append('images', file);
  }
  formData.append('recipe', nameInput.value);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3000/images');
  xhr.send(formData);
  xhr.onerror = () => {
    throw new Error('Request failed');
  };
  xhr.onload = () => {
    console.log('Image request succeeded');
  };
}

fetch('http://localhost:3000/category', {
  method: 'GET',
})
  .then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  })
  .then(data => {
    if (data !== undefined && data !== null) {
      for (const category of data) {
        categories.push({
          name: category.name,
          id: category._id,
        });
      }
      for (const category of categories) {
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', category.id);
        span.innerHTML = category.name;
        label.appendChild(input);
        label.appendChild(span);
        dietSelector.appendChild(label);
        checkboxes.push(input);
      }
    }
  });

recipeList.setAttribute('id', 'recipe-list');
ingredientButton.addEventListener('click', addIngredient);
instructionButton.addEventListener('click', addInstruction);
submitButton.addEventListener('click', addRecipe);
submitButton.addEventListener('click', sendImages);
searchButton.addEventListener('click', () => {
  recipeList.innerHTML = '';
  fetchRecipe(searchInput.value);
});

searchInput.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchButton.click();
  }
});

fetchRecipe('pizza');
fetchRecipe('pasta');
