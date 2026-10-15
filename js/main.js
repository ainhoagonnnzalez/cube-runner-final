//* GLOBAL DOM ELEMENTS
const startScreenNode = document.querySelector("#start-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")
const startBtnNode = document.querySelector("#start-btn")
const gameBoxNode = document.querySelector("#game-box")

//* GLOBAL GAME VARIABLES
let playerObj = null; // hacemos esto para poder acceder a Player desde cualquier sitio, si esta dentro de una funcion, solamente podemos usarlo dentro de esa funcion

let enemyesArray = []; // para poner todos los enemigos

let mainIntervalId = null
let enemyIntervalId = null
//* GLOBAL GAME FUNCTIONS
function gameStart(){
    // 1. changing the screens
    startScreenNode.style.display = "none"
    gameScreenNode.style.display = "flex"

    // 2. adding the inicial elements of the game
    addPlayer();
    addEnemy();
    

    // 3. start the main game interval
    mainIntervalId = setInterval(gameLoop, Math.round(1000/60))    // 60 times per second

    // 4. starting other intervals
    enemyIntervalId = setInterval(addEnemy, 2000)
}

function addPlayer(){
    playerObj = new Player()
    console.log(playerObj)
}

function addEnemy(){
    let randomPosY = Math.floor(Math.random()*350)
    let randomWidth = Math.floor(Math.random()*75) + 25 // 25 -100
    let randomHeight = Math.floor(Math.random()*75) + 25



    let newEnemy = new Cube(randomPosY, randomHeight, randomWidth)
    enemyesArray.push(newEnemy)
    console.log(enemyesArray.length)
}

function gameLoop(){
    enemyesArray.forEach((enemy)=>{
        enemy.automaticMovement()
    })
    checkEnemyDespawn()
    checkCollisionPlayerEnemy()
}

function checkEnemyDespawn(){
    if(enemyesArray[0] && enemyesArray[0].x < -100){
        // 2 actions need to happen when removing an element from the game
        enemyesArray[0].node.remove() // remove from the DOM
        enemyesArray.shift()// remove it from JS
    }
}

function checkCollision(elment1, element2) {
    return (
      elment1.x < element2.x + element2.width &&
      elment1.x + elment1.width > element2.x &&
      elment1.y < element2.y + element2.height &&
      elment1.y + elment1.height > element2.y
    );
}

function checkCollisionPlayerEnemy(){
    enemyesArray.forEach((enemy)=>{
        if(checkCollision(enemy, playerObj)){
            console.log("Colision detected, GAME OVER")
            gameOver()
        }
    })
}

function gameOver(){
    //STOP ALL INTERVALS
    clearInterval(mainIntervalId);
    clearInterval(enemyIntervalId)

    // change screens
    gameScreenNode.style.display = "none"
    gameOverScreenNode.style.display = "flex"

}
//* EVENT LISTENERS

startBtnNode.addEventListener("click", gameStart)

window.addEventListener("keydown", (event)=>{
    if(event.code === "ArrowUp"){
        // move player up
        playerObj.moveUp();

    }
    else if(event.code === "ArrowDown"){
        // move player down
        playerObj.moveDown();
    }
})


