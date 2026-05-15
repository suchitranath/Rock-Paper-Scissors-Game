const choices = ["rock", "paper", "scissors"];
const buttons = document.querySelectorAll(".choice-button");
const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
const resultHeading = document.getElementById("result-heading");
const playerChoiceElement = document.getElementById("player-choice");
const computerChoiceElement = document.getElementById("computer-choice");
const resultMessage = document.getElementById("result-message");
const resetButton = document.getElementById("reset-button");

let playerScore = 0;
let computerScore = 0;
const maxScore = 5;

function getComputerChoice() {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function determineWinner(player, computer) {
  if (player === computer) {
    return "draw";
  }

  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "player";
  }

  return "computer";
}

function updateUI(playerChoice, computerChoice, winner) {
  playerChoiceElement.textContent = `Player choice: ${playerChoice}`;
  computerChoiceElement.textContent = `Computer choice: ${computerChoice}`;

  if (winner === "draw") {
    resultHeading.textContent = "It's a draw!";
    resultMessage.textContent = "Try again.";
    resultMessage.classList.remove("win", "lose");
  } else if (winner === "player") {
    resultHeading.textContent = "You win!";
    resultMessage.textContent = "Great job — you beat the computer.";
    resultMessage.classList.add("win");
    resultMessage.classList.remove("lose");
  } else {
    resultHeading.textContent = "Computer wins!";
    resultMessage.textContent = "The computer got the best of you this round.";
    resultMessage.classList.add("lose");
    resultMessage.classList.remove("win");
  }

  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;

  if (playerScore >= maxScore || computerScore >= maxScore) {
    const winnerText = playerScore > computerScore ? "You" : "Computer";
    resultHeading.textContent = `${winnerText} won the game!`;
    resultMessage.textContent = "Press Reset to play again.";
    buttons.forEach((button) => {
      button.disabled = true;
      button.classList.add("disabled");
    });
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
  resultHeading.textContent = "Make your move";
  playerChoiceElement.textContent = "Player choice: —";
  computerChoiceElement.textContent = "Computer choice: —";
  resultMessage.textContent = "First to 5 wins!";
  resultMessage.classList.remove("win", "lose");
  buttons.forEach((button) => {
    button.disabled = false;
    button.classList.remove("disabled");
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (playerScore >= maxScore || computerScore >= maxScore) {
      return;
    }

    const playerChoice = button.dataset.choice;
    const computerChoice = getComputerChoice();
    const winner = determineWinner(playerChoice, computerChoice);

    if (winner === "player") {
      playerScore += 1;
    } else if (winner === "computer") {
      computerScore += 1;
    }

    updateUI(playerChoice, computerChoice, winner);
  });
});

resetButton.addEventListener("click", resetGame);
