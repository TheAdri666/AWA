const recipeList = document.createElement('div');
recipeList.setAttribute('id', 'recipe-list');
document.body.appendChild(recipeList);

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
    .then((res) => {
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

fetchRecipe('pizza');
fetchRecipe('pasta');
