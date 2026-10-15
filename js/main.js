/* =========================
   DOM ELEMENTS
========================= */

const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");

const startBtnNode = document.querySelector("#start-btn");
const restartBtnNode = document.querySelector("#restart-btn");

const gameBoxNode = document.querySelector("#game-box");

const scoreNode = document.querySelector("#score");
const bestScoreNode = document.querySelector("#best-score");

const finalScoreNode = document.querySelector("#final-score");
const finalBestScoreNode = document.querySelector("#final-best-score");


/* =========================
   GAME VARIABLES
========================= */

let playerObj = null;

let enemyesArray = [];

let mainIntervalId = null;
let enemyIntervalId = null;
let speedIntervalId = null;
let scoreIntervalId = null;

let gameSpeed = 3;

let enemySpawnTime = 2000;

let score = 0;

let bestScore = Number(
  localStorage.getItem("pacmanRunnerBest")
) || 0;

bestScoreNode.innerText = bestScore;


/* =========================
   GAME START
========================= */

function gameStart() {

  // Stop previous intervals
  clearInterval(mainIntervalId);
  clearInterval(enemyIntervalId);
  clearInterval(speedIntervalId);
  clearInterval(scoreIntervalId);


  // Change screens
  startScreenNode.style.display = "none";
  gameOverScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";


  // Reset variables
  playerObj = null;

  enemyesArray = [];

  gameSpeed = 3;

  enemySpawnTime = 2000;

  score = 0;

  scoreNode.innerText = score;


  // Clear game board
  gameBoxNode.innerHTML = "";


  // Create elements
  addPlayer();

  addEnemy();


  // Main game loop
  mainIntervalId = setInterval(
    gameLoop,
    Math.round(1000 / 60)
  );


  // Enemy spawning
  startEnemySpawner();


  // Increase difficulty
  speedIntervalId = setInterval(() => {

    gameSpeed += 0.5;

    // Increase existing enemies' speed too
    enemyesArray.forEach((enemy) => {
      enemy.speed = gameSpeed;
    });


    // Make enemies appear more often
    enemySpawnTime = Math.max(
      700,
      enemySpawnTime - 150
    );

    startEnemySpawner();

  }, 5000);


  // Score timer
  scoreIntervalId = setInterval(() => {

    score += 10;

    scoreNode.innerText = score;

  }, 1000);

}


/* =========================
   CREATE PLAYER
========================= */

function addPlayer() {

  playerObj = new Player();

}


/* =========================
   CREATE ENEMY
========================= */

function addEnemy() {

  const randomWidth = 45

  const randomHeight = 45

  const maxY = gameBoxNode.clientHeight - randomHeight;

  const randomPosY = Math.floor(
    Math.random() * (maxY + 1)
  );

  const newEnemy = new Cube(
    randomPosY,
    randomWidth,
    randomHeight
  );

  enemyesArray.push(newEnemy);

}


/* =========================
   ENEMY SPAWNER
========================= */

function startEnemySpawner() {

  clearInterval(enemyIntervalId);

  enemyIntervalId = setInterval(
    addEnemy,
    enemySpawnTime
  );

}


/* =========================
   GAME LOOP
========================= */

function gameLoop() {

  enemyesArray.forEach((enemy) => {

    enemy.automaticMovement();

  });

  checkEnemyDespawn();

  checkCollisionPlayerEnemy();

}


/* =========================
   REMOVE ENEMIES
========================= */

function checkEnemyDespawn() {

  enemyesArray = enemyesArray.filter((enemy) => {

    if (enemy.x + enemy.width < 0) {

      enemy.node.remove();

      return false;

    }

    return true;

  });

}


/* =========================
   COLLISION DETECTION
========================= */

function checkCollision(element1, element2) {

  return (

    element1.x < element2.x + element2.width &&

    element1.x + element1.width > element2.x &&

    element1.y < element2.y + element2.height &&

    element1.y + element1.height > element2.y

  );

}


/* =========================
   CHECK COLLISIONS
========================= */

function checkCollisionPlayerEnemy() {

  for (const enemy of enemyesArray) {

    if (checkCollision(enemy, playerObj)) {

      gameOver();

      return;

    }

  }

}


/* =========================
   GAME OVER
========================= */

function gameOver() {

  // Stop intervals
  clearInterval(mainIntervalId);
  clearInterval(enemyIntervalId);
  clearInterval(speedIntervalId);
  clearInterval(scoreIntervalId);


  // Update best score
  if (score > bestScore) {

    bestScore = score;

    localStorage.setItem(
      "pacmanRunnerBest",
      bestScore
    );

  }


  // Update scores
  finalScoreNode.innerText = score;

  finalBestScoreNode.innerText = bestScore;

  bestScoreNode.innerText = bestScore;


  // Change screens
  gameScreenNode.style.display = "none";

  gameOverScreenNode.style.display = "flex";

}


/* =========================
   RESTART
========================= */

function restartGame() {

  gameStart();

}


/* =========================
   EVENT LISTENERS
========================= */

startBtnNode.addEventListener("click", gameStart);

restartBtnNode.addEventListener("click", restartGame);


window.addEventListener("keydown", (event) => {

  if (
    !playerObj ||
    gameScreenNode.style.display !== "flex"
  ) {
    return;
  }

  if (event.code === "ArrowUp") {

    event.preventDefault();

    playerObj.moveUp();

  }

  else if (event.code === "ArrowDown") {

    event.preventDefault();

    playerObj.moveDown();

  }

});

/* =========================
   MOBILE CONTROLS
========================= */

// Get mobile buttons from HTML
const upBtnNode = document.querySelector("#up-btn");
const downBtnNode = document.querySelector("#down-btn");

// Variable to store movement interval
let movementInterval = null;


// Check if game is running
function isGameRunning() {

  return playerObj !== null &&
    gameScreenNode.style.display === "flex";

}


// Start moving Pac-Man
function startMoving(direction) {

  if (!isGameRunning()) {
    return;
  }

  stopMoving();

  // Move immediately
  if (direction === "up") {
    playerObj.moveUp();
  } else {
    playerObj.moveDown();
  }

  // Keep moving while button is pressed
  movementInterval = setInterval(() => {

    if (!isGameRunning()) {
      stopMoving();
      return;
    }

    if (direction === "up") {
      playerObj.moveUp();
    } else {
      playerObj.moveDown();
    }

  }, 100);

}


// Stop moving Pac-Man
function stopMoving() {

  clearInterval(movementInterval);

  movementInterval = null;

}


// UP BUTTON
upBtnNode.addEventListener("pointerdown", (event) => {

  event.preventDefault();

  upBtnNode.setPointerCapture(event.pointerId);

  startMoving("up");

});


// DOWN BUTTON
downBtnNode.addEventListener("pointerdown", (event) => {

  event.preventDefault();

  downBtnNode.setPointerCapture(event.pointerId);

  startMoving("down");

});


// Stop movement when button is released
[upBtnNode, downBtnNode].forEach((button) => {

  button.addEventListener("pointerup", stopMoving);

  button.addEventListener("pointercancel", stopMoving);

  button.addEventListener("lostpointercapture", stopMoving);

});


// Stop movement if user leaves the browser
window.addEventListener("blur", stopMoving);