const game = document.getElementById("game");
const gameButtons = document.getElementsByClassName("game-button");

for (let button of gameButtons) {
  button.addEventListener("click", () => {
    console.log(button.id);
  });
}

let wins = 0;
let losses = 0;
let count = 0;
let playerPick;
let opponentPick;
const opponentOptions = ["Rock", "Paper", "Scissors"];
const gameLogic = {
  Rock: {
    Rock: "Draw",
    Paper: "Loss",
    Scissors: "Win",
  },
  Paper: {
    Rock: "Win",
    Paper: "Draw",
    Scissors: "Loss",
  },
  Scissors: {
    Rock: "Loss",
    Paper: "Win",
    Scissors: "Draw",
  },
};

function opening() {
  opponentPick = opponentOptions[Math.floor(Math.random() * 3)];
  game.innerHTML = `
    <div id="player-pick">
        <button class="game-button clickable Rock" id="Rock">Rock</button>
        <button class="game-button clickable Paper" id="Paper">Paper</button>
        <button class="game-button clickable Scissors" id="Scissors">Scissors</button>
    </div>
    `;
  const gameButtons = document.getElementsByClassName("game-button");

  for (let button of gameButtons) {
    button.addEventListener("click", () => {
      playerPick = button.id;
      transitionToResults();
      setTimeout(() => results(), 3000);
    });
  }
}

function transitionToResults() {
  game.innerHTML = `
    <div class="loading">
        <div id="left-hand" class="hand"><i class="fa-solid fa-hand-back-fist"></i></div>
        <div id="right-hand" class="hand"><i class="fa-solid fa-hand-fist"></i></div>
    </div>`;
}

function results() {
  count++;
  let winResults = ["loss", "loss"];
  if (gameLogic[playerPick][opponentPick] == "Win") {
    wins++;
    winResults[0] = "winner";
  } else if (gameLogic[playerPick][opponentPick] == "Loss") {
    losses++;
    winResults[1] = "winner";
  }
  game.innerHTML = `
    <div class="results">
        <div class="pick"><p>You picked:</p><button class="game-button ${playerPick} ${
    winResults[0]
  }" disabled>${playerPick}</button></div>
        <div class="pick"><p>Opponent picked:</p><button class="game-button ${opponentPick} ${
    winResults[1]
  }" disabled>${opponentPick}</button></div>
    </div>
    <div class="score">
        <p>${gameLogic[playerPick][opponentPick]}</p>
        <p>Total Games: ${count}</p>
        <div class="row">
            <p>Wins: ${wins}</p>
            <p>Losses: ${losses}</p>
            <p>Draws: ${count - wins - losses}</p>
        </div>
    </div>
    <button onclick="opening()" class="restart">Play Again</button>
    `;
}

opening();
