// Simple Memory Match game — flip cards, find matching pairs.
// No backend needed, runs entirely in the browser.

const cardIcons = ["🎮", "🎬", "🎧", "🍔", "🏆", "⏰", "🍦", "🍓"];
// duplicate each icon to make pairs, then shuffle
let cardValues = [...cardIcons, ...cardIcons].sort(() => Math.random() - 0.5);

let flippedCards = [];
let matchedCount = 0;
let moveCount = 0;
let lockBoard = false;

const memoryBoard = document.getElementById("memory-board");
const memoryMoves = document.getElementById("memory-moves");
const memoryStatus = document.getElementById("memory-status");
const memoryRestart = document.getElementById("memory-restart");

function buildBoard() {
  memoryBoard.innerHTML = "";
  cardValues.forEach((icon, index) => {
    const card = document.createElement("button");
    card.className = "memory-card";
    card.dataset.icon = icon;
    card.dataset.index = index;
    card.setAttribute("aria-label", "Memory card, face down");
    card.textContent = "?";
    card.addEventListener("click", () => flipCard(card));
    memoryBoard.appendChild(card);
  });
}

function flipCard(card) {
  if (lockBoard) return;
  if (card.classList.contains("flipped") || card.classList.contains("matched"))
    return;
  if (flippedCards.length === 2) return;

  card.classList.add("flipped");
  card.textContent = card.dataset.icon;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moveCount++;
    memoryMoves.textContent = `Moves: ${moveCount}`;
    checkForMatch();
  }
}

function checkForMatch() {
  const [first, second] = flippedCards;

  if (first.dataset.icon === second.dataset.icon) {
    first.classList.add("matched");
    second.classList.add("matched");
    flippedCards = [];
    matchedCount++;

    if (matchedCount === cardIcons.length) {
      memoryStatus.textContent = `You matched all pairs in ${moveCount} moves! 🎉`;
      memoryRestart.hidden = false;
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      first.classList.remove("flipped");
      second.classList.remove("flipped");
      first.textContent = "?";
      second.textContent = "?";
      flippedCards = [];
      lockBoard = false;
    }, 700);
  }
}

function startGame() {
  cardValues = [...cardIcons, ...cardIcons].sort(() => Math.random() - 0.5);
  flippedCards = [];
  matchedCount = 0;
  moveCount = 0;
  lockBoard = false;
  memoryMoves.textContent = "Moves: 0";
  memoryStatus.textContent = "";
  memoryRestart.hidden = true;
  buildBoard();
}

if (memoryBoard) {
  memoryRestart.addEventListener("click", startGame);
  startGame();
}
