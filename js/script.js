document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("grid");
  const gridSize = 6; // Size of the grid (10x10 in this case)
  let count_ships = 0;
  let count = 0;

  function generateRandomPositions(gridSize, numberOfShips) {
    let positions = [];

    while (positions.length < numberOfShips) {
      let newPosition = Math.floor(Math.random() * gridSize * gridSize);

      // Check if the newPosition is already in the positions array
      if (!positions.includes(newPosition)) {
        positions.push(newPosition);
      }
    }

    return positions;
  }

  const shipPositions = generateRandomPositions(gridSize, 6);

  // Function to create grid cells dynamically
  function createGrid() {
    for (let i = 0; i < gridSize * gridSize; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.index = i;

      // Event listener for cell click
      cell.addEventListener("click", function () {

        count = count + 1;

        if (shipPositions.includes(i)) {
          cell.style.backgroundColor = "red"; // Hit (ship found)
          let explosion = document.getElementById("explosion");
          explosion.play();

          count_ships = count_ships + 1;

          if (count_ships === 6) {
            alert("Parabéns! Você afundou todos os navios.\nNúmero de tentativas: " + count);
            location.reload();
          } else {
            alert("Parabéns! Você afundou um navio!");
          }
        } else {
          let fail = document.getElementById("fail");
          fail.play();
          cell.style.backgroundColor = "#a0c4ff"; // Miss
        }
        cell.style.pointerEvents = "none"; // Disable further clicks on this cell
      });

      grid.appendChild(cell);
    }
  }

  createGrid();
});

document.addEventListener("click", function (event) {
  let grid = document.getElementById("grid");
  grid.style.display = "grid";

  let soundtrack = document.getElementById("myAudio");
  soundtrack.play();
  soundtrack.volume = 0.02;

  let background = document.getElementById("background");
  background.style.backgroundImage = `url('assets/img/playing-screen.jpg')`;
});
