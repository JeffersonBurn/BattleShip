let tentativas = document.getElementById("tentativas");
let bombardeados = document.getElementById("bombardeados");


document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("grid");
  const gridSize = 6; // Size of the grid (10x10 in this case)
  let count_ships = 0;
  let count = 0;

  bombardeados.innerHTML = count_ships;
  tentativas.innerHTML = count;

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
  console.log(shipPositions)

  // Function to create grid cells dynamically
  function createGrid() {
    for (let i = 0; i < gridSize * gridSize; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.index = i;

      // Event listener for cell click
      cell.addEventListener("click", function () {

        count = count + 1;
        tentativas.innerHTML = count;

        if (shipPositions.includes(i)) {
          cell.style.backgroundImage = `url('assets/img/tile-explosion.png')`;
          let explosion = document.getElementById("explosion");
          explosion.play();

          count_ships = count_ships + 1;
          bombardeados.innerHTML = count_ships;

          if (count_ships === 6) {
            let battle = document.getElementById("battle");
            battle.pause();
            let win = document.getElementById("win");
            win.play();
            alert("Parabéns! Você afundou todos os navios.\nNúmero de tentativas: " + count);
            location.reload();
          } 
          else if(count === 18){

            let battle = document.getElementById("battle");
            battle.pause();
            let lose = document.getElementById("lose");
            lose.play();
            alert("Infelizmente, você perdeu.\nMais sorte na próxima vez.");
            location.reload();
          }
          else {
            alert("Parabéns! Você afundou um navio!");
          }
        } else {
          let fail = document.getElementById("fail");
          fail.play();
          cell.style.backgroundImage = `url('assets/img/tile-water.jpg')`;

          if (count === 18){

            let battle = document.getElementById("battle");
            battle.pause();
            let lose = document.getElementById("lose");
            lose.play();
            alert("Infelizmente, você perdeu.\nMais sorte na próxima vez.");
            location.reload();
          }
        }
        cell.style.pointerEvents = "none"; // Disable further clicks on this cell
      });

      grid.appendChild(cell);
    }
  }

  createGrid();
});

let tutorial = false;

document.addEventListener("click", function (event) {

  let soundtrack = document.getElementById("myAudio");

  if(!tutorial){

    
    soundtrack.play();

    alert("Existem 6 navios escondidos no nevoeiro.\nSua missão? Explodir todos eles.\nVocê somente possui 18 tentativas.");

    tutorial = true;
  }

  let grid = document.getElementById("grid");
  grid.style.display = "grid";

  soundtrack.pause();
  let battle = document.getElementById("battle");
  battle.play();
  battle.volume = 0.05;

  let background = document.getElementById("background");
  background.style.backgroundImage = `url('assets/img/playing-screen.jpg')`;
});

