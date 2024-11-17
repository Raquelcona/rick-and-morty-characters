const characterList = document.getElementById('character-list');
const prevButton = document.getElementById('prev-page');
const nextButton = document.getElementById('next-page');

let currentPage = 1;
let totalPages = 1;

async function fetchCharacters(page) {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
    const data = await response.json();   


    totalPages = data.info.pages;   

    characterList.innerHTML = ''; // Clear existing characters

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
  } catch (error) {
    console.error('Error fetching characters:', error);
  }
}

fetchCharacters(currentPage);

