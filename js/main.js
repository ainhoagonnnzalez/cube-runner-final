// DOM ELEMENTS

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


// GAME VARIABLES

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


// SHOW SCREEN

function showScreen(screen) {

  startScreenNode.style.display = "none";
  gameScreenNode.style.display = "none";
  gameOverScreenNode.style.display = "none";

  screen.style.display = "flex";

}


// STOP INTERVALS

function stopIntervals() {

  clearInterval(mainIntervalId);
  clearInterval(enemyIntervalId);
  clearInterval(speedIntervalId);
  clearInterval(scoreIntervalId);

}


// GAME START

function gameStart() {

  // Stop previous game
  stopIntervals();

  // Show game screen
  showScreen(gameScreenNode);

  // Reset variables
  playerObj = null;
  enemyesArray = [];

  gameSpeed = 3;
  enemySpawnTime = 2000;

  score = 0;
  scoreNode.innerText = score;

  // Clear board
  gameBoxNode.innerHTML = "";

  // Create player and enemy
  addPlayer();
  addEnemy();

  // Start game loop
  mainIntervalId = setInterval(
    gameLoop,
    Math.round(1000 / 60)
  );

  // Start enemy spawner
  startEnemySpawner();

  // Increase difficulty
  speedIntervalId = setInterval(() => {

    gameSpeed += 0.5;

    enemyesArray.forEach((enemy) => {
      enemy.speed = gameSpeed;
    });

    enemySpawnTime = Math.max(
      700,
      enemySpawnTime - 150
    );

    startEnemySpawner();

  }, 5000);

  // Update score
  scoreIntervalId = setInterval(() => {

    score += 10;

    scoreNode.innerText = score;

  }, 1000);

}


// CREATE PLAYER

function addPlayer() {

  playerObj = new Player();

}


// CREATE ENEMY

function addEnemy() {

  const randomWidth = 45;
  const randomHeight = 45;

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


// ENEMY SPAWNER

function startEnemySpawner() {

  clearInterval(enemyIntervalId);

  enemyIntervalId = setInterval(
    addEnemy,
    enemySpawnTime
  );

}


// GAME LOOP

function gameLoop() {

  enemyesArray.forEach((enemy) => {
    enemy.automaticMovement();
  });

  checkEnemyDespawn();

  checkCollisionPlayerEnemy();

}


// REMOVE ENEMIES

function checkEnemyDespawn() {

  enemyesArray = enemyesArray.filter((enemy) => {

    if (enemy.x + enemy.width < 0) {

      enemy.node.remove();

      return false;

    }

    return true;

  });

}


// COLLISION DETECTION

function checkCollision(element1, element2) {

  return (
    element1.x < element2.x + element2.width &&
    element1.x + element1.width > element2.x &&
    element1.y < element2.y + element2.height &&
    element1.y + element1.height > element2.y
  );

}


// CHECK COLLISIONS

function checkCollisionPlayerEnemy() {

  for (const enemy of enemyesArray) {

    if (checkCollision(enemy, playerObj)) {

      gameOver();

      return;

    }

  }

}


// GAME OVER

function gameOver() {

  // Stop game
  stopIntervals();

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

  // Show Game Over screen
  showScreen(gameOverScreenNode);

}


// RESTART

function restartGame() {

  gameStart();

}


// EVENT LISTENERS

startBtnNode.addEventListener("click", gameStart);

restartBtnNode.addEventListener("click", restartGame);


// KEYBOARD CONTROLS

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

  } else if (event.code === "ArrowDown") {

    event.preventDefault();

    playerObj.moveDown();

  }

});