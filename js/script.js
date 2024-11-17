const characterList = document.getElementById('character-list');
const prevButton = document.getElementById('prev-page');
const nextButton = document.getElementById('next-page');

let currentPage = 1;
let totalPages = 1;

function fetchCharacters(page) {
  fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then(response => response.json())
    .then(data => {
      totalPages = data.info.pages;
      characterList.innerHTML = ''; 

      data.results.forEach(character => {
        const characterItem = document.createElement('li');
        characterItem.innerHTML = `
          <img src="${character.image}" alt="${character.name}">
          <h2>${character.name}</h2>
          <p>Species: ${character.species}</p>
        `;
        characterList.appendChild(characterItem);
      });

      prevButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage === totalPages;
    })
    .catch(error => {
      console.error('Error fetching characters:', error);
    });
}

fetchCharacters(currentPage);


