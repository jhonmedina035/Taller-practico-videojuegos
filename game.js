const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");

let canvasSize;
let elementsSize;

const playerPosition = {
    x: undefined,
    y: undefined
}

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;

  startGame();
}

function startGame() {
  console.log({ canvasSize, elementsSize });

  game.font = elementsSize + "px Verdana";
  game.textAlign = "end";

  const map = maps[0];
  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));
  game.clearRect(0,0,canvasSize,canvasSize);  
  mapRowCols.forEach((row,rowI) => {
    row.forEach((col,colI) => {
        const emoji = emojis[col];
        const posX = elementsSize * (colI +1.2 );
        const posY = elementsSize * (rowI +0.8 );

        if(col == 'O' && playerPosition.y == undefined){
            playerPosition.x = posX;
            playerPosition.y = posY;
            console.log(playerPosition);
        }
        game.fillText(emoji,posX,posY); 
    });
  });
  movePlayer()
}

function movePlayer(){
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

window.addEventListener('keydown', moveBykeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveBykeys(event){
    if(event.key == 'ArrowUp') moveUp();
    else if(event.key == 'ArrowLeft') moveLeft();
    else if(event.key == 'ArrowRight') moveRight();
    else if(event.key == 'ArrowDown')moveDown();  
}

function moveUp() {
    
    if ((playerPosition.y - elementsSize)> 0) {
        playerPosition.y -=elementsSize;
        startGame(); 
    }
}
function moveLeft() {
    if ((playerPosition.x - elementsSize)> elementsSize) {
        playerPosition.x -=elementsSize;
        startGame(); 
    }
    
}
function moveRight() {
    if ((playerPosition.x + elementsSize)<(canvasSize + elementsSize) ){
        playerPosition.x +=elementsSize;
        startGame(); 
    }
}
function moveDown() {
    if ((playerPosition.y + elementsSize)< canvasSize) {
        playerPosition.y +=elementsSize;
        startGame(); 
    }
}
