const pokemonList = document.querySelector("#list");
const selector = document.querySelector("#gen-selector");
const searchBox = document.querySelector("#txtSearch");
let URL = "https://pokeapi.co/api/v2/pokemon/";
let currentPokemons = []; // Almacena los Pokémon cargados de la generación actual

selector.addEventListener("change", () => {
  pokemonList.innerHTML = "";
  currentPokemons = []; // Reiniciar la lista al cambiar de generación
  const pokemonPromises = [];

  if (selector.value == 1) {
    for (let i = 1; i <= 151; i++) {
      const promise = fetch(URL + i)
        .then((response) => response.json())
        .then((data) => data);
      pokemonPromises.push(promise);
    }
  } else if (selector.value == 2) {
    for (let i = 152; i <= 251; i++) {
      const promise = fetch(URL + i)
        .then((response) => response.json())
        .then((data) => data);
      pokemonPromises.push(promise);
    }
  } else if (selector.value == 3) {
    for (let i = 252; i <= 386; i++) {
      const promise = fetch(URL + i)
        .then((response) => response.json())
        .then((data) => data);
      pokemonPromises.push(promise);
    }
  } else if (selector.value == 4) {
    for (let i = 387; i <= 493; i++) {
      const promise = fetch(URL + i)
        .then((response) => response.json())
        .then((data) => data);
      pokemonPromises.push(promise);
    }
  } else if (selector.value == 5) {
    for (let i = 494; i <= 649; i++) {
      const promise = fetch(URL + i)
        .then((response) => response.json())
        .then((data) => data);
      pokemonPromises.push(promise);
    }
  } else if (selector.value == 6) {
    for (let i = 650; i <= 721; i++) {
      const promise = fetch(URL + i)
        .then((response) => response.json())
        .then((data) => data);
      pokemonPromises.push(promise);
    }
  } else if (selector.value == 7) {
    for (let i = 722; i <= 809; i++) {
      const promise = fetch(URL + i)
        .then((response) => response.json())
        .then((data) => data);
      pokemonPromises.push(promise);
    }
  } else if (selector.value == 8) {
    for (let i = 810; i <= 905; i++) {
      const promise = fetch(URL + i)
        .then((response) => response.json())
        .then((data) => data);
      pokemonPromises.push(promise);
    }
  } else if (selector.value == 9) {
    for (let i = 906; i <= 1025; i++) {
      const promise = fetch(URL + i)
        .then((response) => response.json())
        .then((data) => data);
      pokemonPromises.push(promise);
    }
  }

  Promise.all(pokemonPromises)
    .then((pokemons) => {
      currentPokemons = pokemons; // Guarda los Pokémon cargados
      pokemons.sort((a, b) => a.id - b.id);
      displayPokemons(pokemons); // Muestra todos los Pokémon por defecto
    })
    .catch((error) => console.error("Error al cargar los Pokémon", error));
});

searchBox.addEventListener("input", () => {
  const query = searchBox.value.toLowerCase();

  // Filtrar Pokémon por nombre o ID
  const filteredPokemons = currentPokemons.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(query) ||
      pokemon.id.toString().includes(query)
  );

  displayPokemons(filteredPokemons); // Mostrar los Pokémon filtrados
});

function displayPokemons(pokemons) {
  pokemonList.innerHTML = ""; // Limpia la lista
  pokemons.forEach((data) => showPokemon(data)); // Muestra cada Pokémon
}

function showPokemon(data) {
  let types = data.types
    .map((type) => `<p class="${type.type.name} type">${type.type.name}</p>`)
    .join("");

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
      <img data-src="${data.sprites.other["official-artwork"].front_default}">
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

  div.onclick = function () {
    redirect(data.id);
  };
  pokemonList.append(div);

  const img = div.querySelector("img");
  observer.observe(img);
}

function redirect(pokedexID) {
  window.location.href = `pokemon.html?id=${pokedexID}`;
}

const options = {
  rootMargin: "200px",
  threshold: 0.1, // Activar cuando al menos un 10% sea visible
};

const callback = (entries, self) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.getAttribute("data-src");
      img.removeAttribute("data-src");
      self.unobserve(img);
    }
  });
};

const observer = new IntersectionObserver(callback, options);

window.onload = () => {
  selector.dispatchEvent(new Event("change"));
};


