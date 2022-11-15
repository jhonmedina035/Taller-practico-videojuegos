const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const spanLives = document.querySelector('#spanLives');
const spanTime = document.querySelector('#spanTime');
const spanRecor = document.querySelector('#spanRecor')
const result = document.querySelector('#result')

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;
let timeStart = undefined;
let timePlayer;
let timeInterval;
let recor = undefined;
let bombas=[];

const playerPosition = {
    x: undefined,
    y: undefined
}
const giftPosition ={
    x:undefined,
    y:undefined
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
  game.font = elementsSize + "px Verdana";
  game.textAlign = "end";
  const map = maps[level];

  if(!map){
    gameWin();
    return;
  }
  
  if(!timeStart){
    timeStart = Date.now()
    timeInterval = setInterval(showTime, 100);
    showRecort()  
  }
  
  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));
  bombas = [];
  game.clearRect(0,0,canvasSize,canvasSize);  
  mapRowCols.forEach((row,rowI) => {
    row.forEach((col,colI) => {
        const emoji = emojis[col];
        const posX = elementsSize * (colI +1.2 );
        const posY = elementsSize * (rowI +0.8 );

        if(col == 'O'){
            if(playerPosition.y == undefined && playerPosition.x == undefined){
                playerPosition.x = posX;
                playerPosition.y = posY;  
            }  
        }
        if(col == 'I'){ 
                giftPosition.x = posX;
                giftPosition.y = posY;     
        }
        if(col == 'X'){   
            bombas.push({
                x:posX,
                y:posY,
            }) 
        }
        game.fillText(emoji,posX,posY);
    });
  });
  showLives();
  movePlayer();
}
function levenWin(){
    console.log("sibiste de nivel");
    level ++;
    startGame();
}
function levenFail(){
    if(lives > 1){
        lives --;    
    }else{
        lives = 3;
        level = 0;
        timeStart = undefined;
    }
    playerPosition.x = undefined
    playerPosition.y = undefined    
    startGame();
}
function gameWin(){
    clearInterval(timeInterval);
    const recorTime = localStorage.getItem('recor');
    const playerTime =  Date.now() - timeStart
    if(recorTime){
        
        if(recorTime >=  playerTime){
            localStorage.setItem('recor',playerTime);
            result.innerHTML = 'Lograste superar el recort :)'
        }else{
            result.innerHTML = 'No lograste romper el recor :('
        }
    }else{
        localStorage.setItem('recor', playerTime);
        result.innerHTML = 'Es tu primera vez ? Animo !!'
    }
}
function showLives(){
    const heartsArray = Array(lives).fill(emojis['HEART']);
    spanLives.innerHTML="";
    heartsArray.forEach(heart => spanLives.append(heart));
}
function showTime(){
    spanTime.innerHTML = Date.now() - timeStart;
}
function movePlayer(){
    const giftCollisionX = Math.trunc(playerPosition.x) == Math.trunc(giftPosition.x);
    const giftCollisionY = Math.trunc(playerPosition.y) == Math.trunc(giftPosition.y);
    const giftCollision = giftCollisionX && giftCollisionY;
    if(giftCollision){
        levenWin();  
    }
    const enemyCollision = bombas.find(enemy =>{
      const enemyCollisionx = Math.trunc(enemy.x) == Math.trunc(playerPosition.x)
      const enemyCollisiony = Math.trunc(enemy.y) == Math.trunc(playerPosition.y)
      return enemyCollisionx && enemyCollisiony
    });
    if(enemyCollision){
        levenFail();
    }
    
    
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}
function showRecort(){
    spanRecor.innerHTML= localStorage.getItem('recor');
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
