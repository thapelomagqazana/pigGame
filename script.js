// Select elements
const player1Container = document.querySelector(".player-0");
const player2Container = document.querySelector(".player-1");
const player1TotalScore = document.querySelector(".player-0-score");
const player2TotalScore = document.querySelector(".player-1-score");
const player1CurrentScore = document.querySelector(".player-0-current");
const player2CurrentScore = document.querySelector(".player-1-current");
const diceImg = document.querySelector(".dice-img");
const message = document.querySelector(".message");
const diceRollBtn = document.querySelector(".btn-roll");
const holdBtn = document.querySelector(".btn-hold");
const newGameBtn = document.querySelector(".btn-new");

let player1Score;
let player2Score;
let currentScore;
let activePlayer;
let isGameActive;

const initGame = () => {
  player1Score = 0;
  player2Score = 0;
  currentScore = 0;
  message.textContent = "";
  diceImg.src = "";
  diceImg.classList.remove("active"); // Reset dice animation
  player1TotalScore.textContent = player1Score;
  player2TotalScore.textContent = player2Score;
  activePlayer = 1; // (Player 1 starts)
  updatePlayerActiveUI();
  isGameActive = true;
};

const generateRandomNumber = () => Math.trunc(Math.random() * 6) + 1;

const displayDice = (number) => {
  switch (number) {
    case 1:
      diceImg.src = "icons8-dice-1.png";
      break;
    case 2:
      diceImg.src = "icons8-dice-2.png";
      break;
    case 3:
      diceImg.src = "icons8-dice-3.png";
      break;
    case 4:
      diceImg.src = "icons8-dice-4.png";
      break;
    case 5:
      diceImg.src = "icons8-dice-5.png";
      break;
    case 6:
      diceImg.src = "icons8-dice-6.png";
      break;
    default:
      diceImg.src = "";
  }
};

const updateCurrentScore = () => {
  activePlayer
    ? (player1CurrentScore.textContent = currentScore)
    : (player2CurrentScore.textContent = currentScore);
};

const updateTotalScore = () => {
  if (activePlayer) {
    player1Score += currentScore;
    player1TotalScore.textContent = player1Score;
  } else {
    player2Score += currentScore;
    player2TotalScore.textContent = player2Score;
  }
};

const updatePlayerActiveUI = () => {
  if (activePlayer && !player1Container.classList.contains("active")) {
    player2Container.classList.remove("active");
    player1Container.classList.add("active");
  } else if (!activePlayer && !player2Container.classList.contains("active")) {
    player1Container.classList.remove("active");
    player2Container.classList.add("active");
  }
};

const switchPlayers = () => {
  activePlayer ? (activePlayer = 0) : (activePlayer = 1);
  updatePlayerActiveUI();
};

const displayMessage = (text) => (message.textContent = text);

const evaluateTotalScore = () => {
  if (player1Score >= 100) {
    displayMessage("Player 1 wins!");
    diceImg.src = "";
    isGameActive = false;
  } else if (player2Score >= 100) {
    displayMessage("Player 2 wins!");
    diceImg.src = "";
    isGameActive = false;
  }
};

const rollDice = () => {
  if (!isGameActive) {
    return;
  }

  const diceNumber = generateRandomNumber();
  displayDice(diceNumber);
  diceImg.classList.add("active"); // Add the 'active' class to show and animate dice
  setTimeout(() => diceImg.classList.remove("active"), 1000); // Remove animation after 1s
  if (diceNumber === 1) {
    currentScore = 0;
    updateCurrentScore();
    switchPlayers();
  } else {
    currentScore += diceNumber;
    updateCurrentScore();
  }
};

const holdScore = () => {
  if (!isGameActive) {
    return;
  }
  updateTotalScore();
  evaluateTotalScore();
  currentScore = 0;
  updateCurrentScore();
  switchPlayers();
};

initGame();

diceRollBtn.addEventListener("click", rollDice);
holdBtn.addEventListener("click", holdScore);
newGameBtn.addEventListener("click", initGame);
