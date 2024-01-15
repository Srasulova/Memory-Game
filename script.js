const gameContainer = document.getElementById("game");
const restartBtn = document.querySelector(".restart");
const player1 = document.querySelector(".player1score");
const player2 = document.querySelector(".player2score");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!

let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;
let firstCardClicked = null;
let secondCardClicked = null;
let timeoutId = null; // Variable to store the timeout ID

function handleCardClick(event) {
  console.log("you just clicked", event.target);
  console.log(event.target.className);

  // If two cards are already clicked and waiting, ignore new clicks
  if (firstCardClicked && secondCardClicked) {
    return;
  }

  // Clear any existing timeout
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  const initialColor = event.target.style.backgroundColor;
  const flippedColor = event.target.className;

  if (!firstCardClicked) {
    // First card clicked
    firstCardClicked = event.target;
    firstCardClicked.style.backgroundColor = flippedColor;

    // Set timeout to flip back to initial color after 2 seconds
    timeoutId = setTimeout(() => {
      if (firstCardClicked) {
        firstCardClicked.style.backgroundColor = initialColor;
        firstCardClicked = null;
      }
    }, 1000);
  } else if (!secondCardClicked && firstCardClicked !== event.target) {
    // Second card clicked, ensure it's not the same as the first one
    secondCardClicked = event.target;
    secondCardClicked.style.backgroundColor = flippedColor;

    // Check if the colors match
    if (firstCardClicked.className === secondCardClicked.className) {
      // Colors match, increment player score
      if (currentPlayer === 1) {
        player1Score++;
        player1.textContent = player1Score;
      } else {
        player2Score++;
        player2.textContent = player2Score;
      }

      // Reset cards and switch player
      firstCardClicked = null;
      secondCardClicked = null;
      currentPlayer = currentPlayer === 1 ? 2 : 1;
    } else {
      // Colors don't match, use setTimeout to revert the color after 2 seconds
      timeoutId = setTimeout(() => {
        // Check if the cards are different before reverting colors
        if (firstCardClicked && secondCardClicked) {
          firstCardClicked.style.backgroundColor = initialColor;
          secondCardClicked.style.backgroundColor = initialColor;
          firstCardClicked = null;
          secondCardClicked = null;
        }

        // Switch player after reverting colors
        currentPlayer = currentPlayer === 1 ? 2 : 1;
      }, 1000);
    }
  }
}

restartBtn.addEventListener("click", function () {
  // Remove all existing cards
  gameContainer.innerHTML = "";

  // Shuffle colors array to create a new order
  shuffledColors = shuffle(COLORS);

  // Create and append new divs for the shuffled colors
  createDivsForColors(shuffledColors);

  // Reset player scores and other game-related variables
  currentPlayer = 1;
  player1Score = 0;
  player2Score = 0;
  firstCardClicked = null;
  secondCardClicked = null;
  timeoutId = null;
  player1.textContent = "0";
  player2.textContent = "0";
});

// when the DOM loads
createDivsForColors(shuffledColors);
