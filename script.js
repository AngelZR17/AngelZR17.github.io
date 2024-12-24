const pokemonList = document.querySelector("#list");
let URL = "https://pokeapi.co/api/v2/pokemon/";
const pokemonPromises = [];

for (let i = 650; i <= 809; i++) {
    const promise = fetch(URL + i)
        .then((response) => response.json())
        .then(data => data);
    pokemonPromises.push(promise);
}

Promise.all(pokemonPromises)
  .then(pokemons => {
      pokemons.sort((a, b) => a.id - b.id);
      pokemons.forEach(data => showPokemon(data));
  })
  .catch(error => console.error("Error al cargar los Pokémon", error));

function showPokemon(data) {
    let types = data.types.map(type => `<p class="${type.type.name} type">${type.type.name}</p>`);
    types = types.join('');

    let pokemonID = data.id.toString();
    if (pokemonID.length === 1) {
      pokemonID = "00" + pokemonID;
    } else if (pokemonID.length === 2) {
      pokemonID = "0" + pokemonID;
    } 
    
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
      <div class="pokemon-img">
        <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
      </div>
      <div class="pokemon-info">
          <div class="container">
            <p class="pokemon-id">#${pokemonID}</p>
            <h2 class="pokemon-name">${data.name}</h2>
          </div>
          <div class="pokemon-types">
              ${types}
          </div>
      </div>
    `;
    
    div.onclick = function() {
      redirect(data.id);
    };
    pokemonList.append(div);
}

function redirect(pokedexID) {
    window.location.href = `pokemon.html?id=${pokedexID}`;
}
