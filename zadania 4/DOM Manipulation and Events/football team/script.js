const footballTeam = {
  team: "France",
  year: 1998,
  headCoach: "Aimé Jacquet",
  players: [
    {
      name: "Bernard Lama",
      position: "goalkeeper",
      isCaptain: false,
    },
    {
      name: "Vincent Candela",
      position: "defender",
      isCaptain: false,
    },
    {
      name: "Bixente Lizarazu",
      position: "defender",
      isCaptain: false,
    },
    {
      name: "Patrick Vieira",
      position: "midfielder",
      isCaptain: false,
    },
    {
      name: " Laurent Blanc",
      position: "defender",
      isCaptain: false,
    },
    {
      name: "Youri Djorkaeff",
      position: "midfielder",
      isCaptain: false,
    },
    {
      name: "Didier Deschamps",
      position: "midfielder",
      isCaptain: true,
    },
    {
      name: "Marcel Desailly",
      position: "defender",
      isCaptain: false,
    },
    {
      name: "Stéphane Guivarc'h",
      position: "forward",
      isCaptain: false,
    },
    {
      name: "Zinedine Zidane",
      position: "midfielder",
      isCaptain: false,
    },
    {
      name: "Robert Pires",
      position: "midfielder",
      isCaptain: false,
    },
    {
      name: "Thierry Henry",
      position: "forward",
      isCaptain: false,
    },
    {
      name: "Bernard Diomède",
      position: "midfielder",
      isCaptain: false,
    },
    {
      name: "Alain Boghossian",
      position: "midfielder",
      isCaptain: false,
    },
    {
      name: "Lilian Thuram",
      position: "defender",
      isCaptain: false,
    },
    {
      name: "Fabien Barthez",
      position: "goalkeeper",
      isCaptain: false,
    },
    {
      name: "Emmanuel Petit",
      position: "midfielder",
      isCaptain: false,
    },
    {
      name: "Frank Leboeuf",
      position: "defender",
      isCaptain: false,
    },
    {
      name: "Christian Karembeu",
      position: "midfielder",
      isCaptain: false,
    },
    {
      name: "David Trezeguet",
      position: "forward",
      isCaptain: false,
    },
    {
      name: "Christophe Dugarry",
      position: "forward",
      isCaptain: false,
    },
    {
      name: "Lionel Charbonnier",
      position: "goalkeeper",
      isCaptain: false,
    },
  ]
}

const headCoach = document.getElementById("head-coach");
const team = document.getElementById("team");
const year = document.getElementById("year");
let playersSelector = document.getElementById("players");
const cards = document.querySelector("#player-cards");

headCoach.textContent = footballTeam.headCoach;
team.textContent = footballTeam.team;
year.textContent = footballTeam.year;

function playerCards(playerPosition) {
  const players =
    playerPosition === "all"
      ? footballTeam.players
      : footballTeam.players.filter(
          ({ position }) => position === playerPosition
        );
  return players.map(({ name, position }) => {
    return `
      <div class="player-card">
        <h2>${name}</h2>
        <p>${position}</p>
      </div>
    `;
  }).join("");
}

playersSelector.addEventListener("change", () => {
  cards.innerHTML = playerCards(playersSelector.value)
});
