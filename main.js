// Definir los Pokémon por rareza con puntos
const pokemonLootTable = [
  {
    rarity: "comun",
    probability: 50, // Ajustado de 60 a 55
    pokemon: [
      { name: "Caterpie", points: 1 },
      { name: "Pidgey", points: 2 },
      { name: "Ekans", points: 1 },
      { name: "Zubat", points: 2 },
    ],
  },
  {
    rarity: "poco_comun",
    probability: 20, // Ajustado de 30 a 25
    pokemon: [
      { name: "Gastly", points: 5 },
      { name: "Chansey", points: 7 },
      { name: "Snorlax", points: 10 },
      { name: "Pinsir", points: 6 },
    ],
  },
  {
    rarity: "epico",
    probability: 15, // Ajustado de 15 a 13
    pokemon: [
      { name: "Dragonite", points: 17 },
      { name: "Charizard", points: 12 },
      { name: "Metagross", points: 15 },
      { name: "Salamence", points: 15 },
    ],
  },
  {
    rarity: "legendario",
    probability: 10, // Ajustado de 10 a 7
    pokemon: [
      { name: "Deoxys", points: 50 },
      { name: "Mew", points: 50 },
      { name: "Mewtwo", points: 50 },
    ],
  },
  {
    rarity: "variocolor",
    probability: 5, // Ajustado de 5 a 10
    pokemon: [
      { name: "Zubat_shiny", points: 40 },
      { name: "Charizard_shiny", points: 80 },
      { name: "Caterpie_shiny", points: 40 },
      { name: "Ekans_shiny", points: 40 },
      { name: "Dragonite_shiny", points: 80 },
      { name: "Metagross_shiny", points: 80 },
      { name: "Salamence_shiny", points: 80 },
      { name: "Pidgey_shiny", points: 40 },
      { name: "Gastly_shiny", points: 60 },
      { name: "Pinsir_shiny", points: 60 },
      { name: "Chansey_shiny", points: 60 },
      { name: "Mewtwo_shiny", points: 100 },
      { name: "Mew_shiny", points: 100 },
      { name: "Snorlax_shiny", points: 60 },
      { name: "Venomoth_shiny", points: 60 },
      { name: "Deoxys_shiny", points: 100 },
    ],
  },
];

// Variables globales
let playerPoints = 0;
let rounds = 0;

// Función para actualizar la puntuación en la interfaz
function updateScore() {
  document.querySelector("#puntos").textContent = "Score " + playerPoints;
}

// Función para seleccionar un Pokémon basado en la probabilidad
function selectPokemon() {
  const randomNum = Math.random() * 100;
  let cumulativeProbability = 0;

  for (const category of pokemonLootTable) {
    cumulativeProbability += category.probability;
    if (randomNum < cumulativeProbability) {
      const randomIndex = Math.floor(Math.random() * category.pokemon.length);
      return category.pokemon[randomIndex];
    }
  }
}

// Función para configurar los listeners de las Pokéballs
function setupPokeballListeners(selectedPokemon) {
  document.querySelectorAll(".pokeball").forEach((pokeball) => {
    const newPokeball = pokeball.cloneNode(true);
    pokeball.parentNode.replaceChild(newPokeball, pokeball);

    newPokeball.addEventListener("click", () => {
      revealPokemon(selectedPokemon, newPokeball);
    });
  });
}

// Función para mostrar el Pokémon seleccionado
function revealPokemon(selectedPokemon, pokeball) {
  displayPokemon(selectedPokemon);
  animatePokeball(pokeball);
  playPokemonSound(selectedPokemon.name);
  updateScore();
  displayPoints(selectedPokemon.points);

  if (selectedPokemon.name.includes("_shiny")) {
    shinyPokemonAnimation();
  }

  document.querySelector(".pokemon").addEventListener("click", resetGame);
}

// Función para mostrar el Pokémon en la pantalla
function displayPokemon(selectedPokemon) {
  const spriteImg = document.querySelector("#sprite");
  spriteImg.src = "./data/images/" + selectedPokemon.name + ".png";

  document.querySelector(".pokemon").style.display = "flex";
  setTimeout(() => {
    document.querySelector(".pokemon").style.opacity = "1";
  }, 180);
}

// Función para animar la Pokéball
function animatePokeball(pokeball) {
  pokeball.classList.add("open");
  setTimeout(() => {
    document.querySelector(".container").style.display = "none";
  }, 200);
}

// Función para reproducir el sonido del Pokémon
function playPokemonSound(pokemonName) {
  const audio = new Audio("data/sounds/" + pokemonName.replace("_shiny", "") + ".mp3");
  audio.volume = 0.1;
  setTimeout(() => {
    audio.play();
  }, 200);
}

// Función para mostrar los puntos obtenidos
function displayPoints(points) {
  const puntosExtras = document.querySelector("#puntosExtras");
  puntosExtras.textContent = "+" + points;
}

// Función para animar un Pokémon shiny
function shinyPokemonAnimation() {
  const audio = new Audio("data/sounds/shiny.mp3");
  setTimeout(() => {
    audio.play();
  }, 300);

  const shinyAnimation = document.querySelector("#shiny_animation");
  shinyAnimation.style.display = "block";
}

// Función para reiniciar el juego o iniciar una nueva ronda
function resetGame() {
  hidePokemon();
  resetPokeballs();

  if (rounds < 3) {
    startGame();
  } else {
    endGame();
  }
}

// Función para ocultar el Pokémon
function hidePokemon() {
  const shinyAnimation = document.querySelector("#shiny_animation");
  shinyAnimation.style.display = "none";
  shinyAnimation.src = "./data/animations/shiny.gif";

  const pokemonElement = document.querySelector(".pokemon");
  pokemonElement.style.display = "none";
  pokemonElement.style.opacity = "0";

  document.querySelector(".container").style.display = "flex";
}

// Función para reiniciar las Pokéballs
function resetPokeballs() {
  document.querySelectorAll(".pokeball").forEach((pokeball) => {
    pokeball.classList.remove("open");
  });
}

// Función para finalizar el juego
function endGame() {
  alert("¡Juego terminado! Total de puntos: " + playerPoints);
  playerPoints = 0;
  updateScore();
  rounds = 0;
  setTimeout(() => {
    resetGame();
  });
}

// Función para iniciar el juego
function startGame() {
  rounds++;
  const selectedPokemon = selectPokemon();
  console.log("Pokémon seleccionado:", selectedPokemon.name);
  console.log("Puntos obtenidos:", selectedPokemon.points);

  playerPoints += selectedPokemon.points;
  setupPokeballListeners(selectedPokemon);
}

// Iniciar el juego
startGame();