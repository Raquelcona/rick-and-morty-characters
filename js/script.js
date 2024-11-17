const Personajes = document.getElementById('character-list');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');   


let PagActual = 1;
let PagTotal = 1;

async function fetchCharacters(page) {
  try {
    const respuesta = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
    const datos = await respuesta.json();

    PagTotal = datos.info.pages;


    Personajes.innerHTML = ''; 

    datos.results.forEach(character => {
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h2>${character.name}</h2>
        <p>Species: ${character.species}</p>
      `;
      Personajes.appendChild(li);
    });


    prevPageButton.disabled = PagActual === 1;
    nextPageButton.disabled = PagActual === PagTotal;
  } catch (error) {
    console.error('Error fetching characters:', error);
  }
}

fetchCharacters(PagActual);

