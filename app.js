const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const winnerMsg = document.getElementById("winner-msg");
const playerXCounter = document.querySelector(".player1Counter");
const playerOCounter = document.querySelector(".player2Counter");
const drawCounter = document.querySelector(".drawCounter");

// Alternate turns
let turn0 = true;
let count = 0;
let playerX = 0;
let playerO = 0;
let playerdraw = 0;

// Winning pattern
let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  enableBtn();
  resetBtn.innerText = "Reset Game";
  count = 0;
  turn0 = true;
};

resetBtn.addEventListener("click", function () {
  resetGame();
});

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    count++;
    if (turn0) {
      box.innerText = "O";
      box.classList.add("o");
      turn0 = false;
    } else {
      box.innerText = "X";
      box.classList.add("x");
      turn0 = true;
    }
    box.disabled = true;

    draw();
    checkWinner();
  });
});

const disabledBtn = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enableBtn = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("x", "o");
  });
};

const draw = () => {
  if (count === 9) {
    playerdraw++;
    drawCounter.innerText = playerdraw;
    resetBtn.innerText = "New Game";
  }
};

const showWinner = (pos1Val) => {
  if (pos1Val === "O") {
    playerO++;
    playerOCounter.innerText = playerO;
  } else if (pos1Val === "X") {
    playerX++;
    playerXCounter.innerText = playerX;
  }

  resetBtn.innerText = "New Game";
  disabledBtn();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        break;
      }
    }
  }
};
