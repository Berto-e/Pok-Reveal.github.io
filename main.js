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


function updateScore() {
  document.querySelector("#puntos").textContent = "Score " + playerPoints;
}

// Puntos del jugador
let playerPoints = 0;
let rounds = 0;

// Función para seleccionar un Pokémon basado en la probabilidad
function selectPokemon() {
  const randomNum = Math.random() * 100; // Número aleatorio entre 0 y 100
  let cumulativeProbability = 0;

  for (const category of pokemonLootTable) {
    cumulativeProbability += category.probability;
    if (randomNum < cumulativeProbability) {
      // Seleccionar un Pokémon aleatorio dentro de la categoría
      const randomIndex = Math.floor(Math.random() * category.pokemon.length);
      const selectedPokemon = category.pokemon[randomIndex];

    

      return { name: selectedPokemon.name, points: selectedPokemon.points };
    }
  }
}

function startGame() {
  rounds++;

  // Seleccionar un Pokémon aleatorio de la lista
  const selectedPokemon = selectPokemon();
  console.log("Pokémon seleccionado:", selectedPokemon.name);
  console.log("Puntos obtenidos:", selectedPokemon.points);
  // Puntos
  playerPoints += selectedPokemon.points;

  // Asignar el pokemon elegido a su sprite
  const spriteImg = document.querySelector("#sprite");
  spriteImg.src = "./data/images/" + selectedPokemon.name + ".png";
  
  // Remover event listeners anteriores
  document.querySelectorAll(".pokeball").forEach((pokeball) => {
    const newPokeball = pokeball.cloneNode(true);
    pokeball.parentNode.replaceChild(newPokeball, pokeball);
  });

  // Click en la pokeball ->
  document.querySelectorAll(".pokeball").forEach((pokeball) => {
    pokeball.addEventListener("click", () => {
      // Mostrar el pokemon obtenido
      document.querySelector(".pokemon").style.display = "flex";
      setTimeout(() => {
        document.querySelector(".pokemon").style.opacity = "1";
      }, 180);

      // Animación apertura pokeball
      pokeball.classList.add("open");

      // Sonido del pokemon obtenido
      var audio = new Audio(
        "data/sounds/" + selectedPokemon.name.replace("_shiny", "") + ".mp3"
      );
      audio.volume = 0.1;
      setTimeout(() => {
        audio.play();
      }, 200);

      // Puntuaje
      updateScore();

      // Eliminar las Pokéballs
      setTimeout(() => {
        document.querySelector(".container").style.display = "none";
      }, 200);

      // Si sale shiny, realizar la animación para shiny
      if (selectedPokemon.name.includes("_shiny")) {
        shinyPokemonAnimation();
      }

      // Resetear el juego después de una pequeña pausa
      setTimeout(() => {
        resetGame();
      }, 1800);
    });
  });
}

function shinyPokemonAnimation() {
  var audio = new Audio("data/sounds/shiny.mp3");

  // Reproduce el sonido
  setTimeout(() => {
    audio.play();
  }, 300);

  document.querySelector("#shiny_animation").style.display = "block";
}

function resetGame() {
  // Resetear la interfaz para la siguiente ronda
  const animationElement = document.querySelector("#shiny_animation");
  animationElement.src = "";
  animationElement.src = "./data/animations/shiny.gif";
  animationElement.style.display = "none";
  document.querySelector(".pokemon").style.display = "none";
  document.querySelector(".pokemon").style.opacity = "0";
  document.querySelector(".container").style.display = "flex";

  // Restablecer la clase 'open' de las pokeballs
  document.querySelectorAll(".pokeball").forEach((pokeball) => {
    pokeball.classList.remove("open");
  });

  // Iniciar la siguiente ronda
  if (rounds < 3) {
    startGame();
  } else {
    alert("¡Juego terminado! Total de puntos: " + playerPoints);
    playerPoints = 0;
    updateScore();
    rounds = 0;

    setTimeout(() => {
      resetGame();
    });
  }
}

// Iniciar el juego
startGame();
