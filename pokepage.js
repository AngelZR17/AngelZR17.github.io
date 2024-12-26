const urlParams = new URLSearchParams(window.location.search);
const pokedexID = urlParams.get('id');
let URL = `https://pokeapi.co/api/v2/pokemon/${pokedexID}`;

fetch(URL)
    .then(response => response.json())
    .then(data => showPokemonDetails(data))

function showPokemonDetails(data) {
    let types = data.types.map(type => `<p class="${type.type.name} type">${type.type.name}</p>`);
    let abilities = data.abilities.map(ability => `<p class="${ability.ability.name} ability">${ability.ability.name}</p>`)
    let stats = data.stats.map(stat => `<p class="other-stat">${stat.stat.name}: ${stat.base_stat}</p>`);
    let pokemonID = data.id.toString();

    types = types.join('');
    abilities = abilities.join('');
    stats = stats.join('');
    
    if (pokemonID.length === 1) {
      pokemonID = "00" + pokemonID;
    } else if (pokemonID.length === 2) {
      pokemonID = "0" + pokemonID;
    } 

    const pokemonContainer = document.querySelector("main > div");
    pokemonContainer.innerHTML = `
        <div class="pokemon-img-detail">
            <img src="${data.sprites.other.showdown.front_default}" alt="${data.name}">
        </div>
        <div class="pokemon-info-detail">
            <div class="container">
                <p class="pokemon-id">#${pokemonID}</p>
                <h2 class="pokemon-name">${data.name}</h2>
            </div>
            <div class="pokemon-types">
                ${types}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${(data.height/10).toFixed(1)} m</p>
                <p class="stat">${(data.weight/10).toFixed(1)} kg</p> 
            </div>
            <hr>
            <div class="other-stats">
                <h2 class="title">MAIN STATS</h2>
                ${stats}
            </div>
            <hr>
            <div class="pokemon-abilities">
                <h2 class="title">ABILITIES</h2>
                ${abilities}
            </div>
        </div>
    `;
}

function redirect() {
    window.location.href = `index.html`;
}
