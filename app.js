let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#btnReset");
let newGameBtn = document.querySelector("#newGame");
let msgContainer = document.querySelector("#msg-container");
let msg = document.querySelector(".msg");
let count = 0;
let turnX = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () =>{
    if(turnX){
      box.innerText = "X";
      turnX = false;
    }else{
      box.innerText = "O";
      turnX = true;
    }
    box.disabled = true;
    count ++;

    let isWinner = checkWinner();
    if(count === 9 && !isWinner ){
      drawGame();
    }
  });
});

const resetGame = () => {
  turnX = true;
  count = 0;
  enableBoxes();
  msg.classList.add("hide");
}

const disableBoxes = () => {
  for(let box of boxes){
    box.disabled  = true;
  }
}

const enableBoxes = () => {
  for(let box of boxes){
    box.disabled  = false;
    box.innerText = "";
  }
}


const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msg.classList.remove("hide");
  disableBoxes();
}

const drawGame = () => {
  msg.innerText = "Game Drawn";
  msg.classList.remove("hide");
  disableBoxes();
}

const checkWinner = () => {
  for(let pattern of winPatterns){
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if(pos1 != "" && pos2 != "" && pos3 != ""){
      if(pos1 === pos2 && pos2 === pos3){
        showWinner(pos1);
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

