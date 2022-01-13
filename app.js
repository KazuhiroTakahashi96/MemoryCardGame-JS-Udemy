const cards = document.querySelectorAll(".memory-card");

let cardIsFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  //   console.log(this);
  //   this.classList.toggle("flip");
  this.classList.add("flip");
  // thisの参考　https://www.sejuku.net/blog/29389

  if (!cardIsFlipped) {
    // first click => first card
    cardIsFlipped = true;
    firstCard = this;
    return;
  }
  // second click => second card

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatched = firstCard.dataset.name === secondCard.dataset.name;
  isMatched ? disableCards() : unFlipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unFlipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [cardIsFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// IIFE Immediately Invoked Function Expression => function is called immediately after definition
(function shuffle() {
  cards.forEach(function (card) {
    let randomPosition = Math.floor(Math.random() * 12);
    // console.log(randomPosition);
    card.style.order = randomPosition;
  });
})();

cards.forEach(function (card) {
  card.addEventListener("click", flipCard);
});
