const gameContainer = document.getElementById("game");

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

// function handleCardClick(event) {
//   console.log("you just clicked", event.target);
//   console.log(event.target.className);

//   const initialColor = event.target.style.backgroundColor;
//   const flippedColor = event.target.className;

//   if (!firstCardClicked) {
//     // First card clicked
//     firstCardClicked = event.target;
//     firstCardClicked.style.backgroundColor = flippedColor;

//     // Set timeout to flip back to initial color after 2 seconds
//     setTimeout(() => {
//       if (firstCardClicked) {
//         firstCardClicked.style.backgroundColor = initialColor;
//         firstCardClicked = null;
//       }
//     }, 1000);
//   } else if (!secondCardClicked) {
//     // Second card clicked
//     secondCardClicked = event.target;
//     secondCardClicked.style.backgroundColor = flippedColor;

//     // Check if the colors match
//     if (
//       firstCardClicked !== secondCardClicked &&
//       firstCardClicked.className === secondCardClicked.className
//     ) {
//       // Colors match, increment player score
//       if (currentPlayer === 1) {
//         player1Score++;
//         document.querySelector(".player1score").textContent = player1Score;
//       } else {
//         player2Score++;
//         document.querySelector(".player2score").textContent = player2Score;
//       }

//       // Reset cards and switch player
//       firstCardClicked = null;
//       secondCardClicked = null;
//       currentPlayer = currentPlayer === 1 ? 2 : 1;
//     } else {
//       // Colors don't match, use setTimeout to revert the color after 2 seconds
//       setTimeout(() => {
//         // Check if the cards are different before reverting colors
//         if (firstCardClicked !== secondCardClicked) {
//           if (firstCardClicked) {
//             firstCardClicked.style.backgroundColor = initialColor;
//             firstCardClicked = null;
//           }
//           if (secondCardClicked) {
//             secondCardClicked.style.backgroundColor = initialColor;
//             secondCardClicked = null;
//           }
//         }

//         // Switch player after reverting colors
//         currentPlayer = currentPlayer === 1 ? 2 : 1;
//       }, 1000);
//     }
//   }
// }

function handleCardClick(event) {
  console.log("you just clicked", event.target);
  console.log(event.target.className);

  const initialColor = event.target.style.backgroundColor;
  const flippedColor = event.target.className;

  if (!firstCardClicked) {
    // First card clicked
    firstCardClicked = event.target;
    firstCardClicked.style.backgroundColor = flippedColor;

    // Set timeout to flip back to initial color after 2 seconds
    setTimeout(() => {
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
        document.querySelector(".player1score").textContent = player1Score;
      } else {
        player2Score++;
        document.querySelector(".player2score").textContent = player2Score;
      }

      // Reset cards and switch player
      firstCardClicked = null;
      secondCardClicked = null;
      currentPlayer = currentPlayer === 1 ? 2 : 1;
    } else {
      // Colors don't match, use setTimeout to revert the color after 2 seconds
      setTimeout(() => {
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

// when the DOM loads
createDivsForColors(shuffledColors);
