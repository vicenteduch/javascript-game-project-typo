//classes

class Enemy {
    constructor() {
        this.health = (3 + Math.floor(score / 3))
        this.power = (1 + Math.floor(score / 3))
    }

    checkEnemyHealth() {
        if (this.health <= 0) {
            killEnemy()
        }
    }

}

class Player {
    constructor() {
        this.health = 10
        this.power = 2
    }

    checkPlayerHealth() {
        console.log("el jugador tiene esta vida: ", player.health)
        if (player.health <= 0) {
            console.log("YOU DIED")
            killPlayer()
        }
    }
}

//Variables

let score = 0

const enemyArr = []

let arrowArr = []

const player = new Player()

let currentEnemy = new Enemy()

const keyMap = {
    ArrowUp: 0,  // arrowUp ^
    ArrowDown: 1,  // arrowDown v
    ArrowLeft: 2,  // arrowLeft <
    ArrowRight: 3   // arrowRight >
}

const arrowImages = {
    0: "./src/arrow-up.png",
    1: "./src/arrow-down.png",
    2: "./src/arrow-left.png",
    3: "./src/arrow-right.png"
}

const controls = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"]

const playerInput = []

document.addEventListener('keydown', function (event) { // -> Event Listener to check that you only type the controls keys.
    if (controls.includes(event.key)) {
        checkInputs(event.key)
    }
})

console.log(`Hello! im a new player and my hp is ` + player.health + ` and my power is ` + player.power)
console.log(`Hello! Im the first enemy, my hp is ` + currentEnemy.health + ` and my power is ` + currentEnemy.power)

currentEnemy = new Enemy()

let arrowIndex = 0
let startbutton = document.getElementById("start-button")
let mainMenu = document.getElementById("main-container")
let gameScreen = document.getElementById("game-container")
let arrowsImg = document.getElementById("arrow-container")
let playerHp = document.getElementById("playerHP")
let killCount = document.getElementById("score")

//Game mechanics functions

function getNewSequence() {
    arrowArr = []
    let arraylength = (4 + Math.floor(score / 3))
    for (let i = 0; i < arraylength; i++) {
        arrowArr.push(Math.floor(Math.random() * 4))

    }
    arrowIndex = 0
    showArrows()
    console.log(arrowArr)
}

function showArrows() {
    arrowsImg.innerHTML = "" //clearing previous arrows

    arrowArr.forEach(value => {
        const img = document.createElement("img")
        img.src = arrowImages[value]
        arrowsImg.appendChild(img)
    })
}

function showScore() {
    let killCount = document.getElementById("score")
    let playerScore = document.getElementById("playerScore")

    if (!playerScore) {
        playerScore = document.createElement("h2")
        playerScore.id = "playerScore"
        playerScore.style.color = "white"
        killCount.appendChild(playerScore)
    }

    playerScore.innerText = `Kill Streak ${score}`
}

function checkInputs(eventKey) {

    if (arrowArr[arrowIndex] === keyMap[eventKey]) {
        arrowIndex++
        if (arrowIndex === arrowArr.length) {
            correctInput()
        }
        console.log("ACIERTO!")
    } else {
        wrongInput()
        arrowIndex = 0
    }
}


function wrongInput() {
    console.log("FALLO!")
    player.health -= currentEnemy.power
    player.checkPlayerHealth()
    showPlayerHp()
    console.log("player has " + player.health + "hp")
}

function correctInput() {
    enemyIntervalAttack()
    damageEnemy()
    currentEnemy.checkEnemyHealth()
    console.log("Enemy HP is ", currentEnemy.health)
    getNewSequence()
}


//Player functions


function damagePlayer() {
    console.log("El enemigo te hace " + currentEnemy.power + " punto(s) de daño")
    player.health = (player.health - currentEnemy.power)
    player.checkPlayerHealth()
    showPlayerHp()

}


function killPlayer() {
    if (player.health <= 0) {
        location.href = "gameover.html"
    }
}

function showPlayerHp(){
    let playerHitPoints = document.getElementById("playerHP")
    let remainingHp = document.getElementById("remainingHp")

    if (!remainingHp) {
        remainingHp = document.createElement("h2")
        remainingHp.id = "remainingHp"
        remainingHp.style.color ="white"
        playerHitPoints.appendChild(remainingHp)
    }

    remainingHp.innerText =`${player.health} HP`
}

// Enemy functions

function generateNewEnemy() {
    console.log("hi im a new Enemy")
    const newEnemy = new Enemy()
    currentEnemy = newEnemy
    enemyArr.push(newEnemy)

}


let enemyTimer

function enemyIntervalAttack() {

    if (enemyTimer) {
        clearTimeout(enemyTimer)
    }
    enemyTimer = setTimeout(() => {
        damagePlayer()
        enemyIntervalAttack()
    }, 3000)
}

function damageEnemy() {

    currentEnemy.health = (currentEnemy.health - player.power)

}

function killEnemy() {
    score++
    showScore()
    console.log("This is your score: ", score)
    enemyArr.pop()
    generateNewEnemy()
    console.log(score)
}


//Event Listeners



startbutton.addEventListener("click", () => {

    enemyIntervalAttack()
    showScore()
    showPlayerHp()
    getNewSequence()
    mainMenu.style.display = "none"
    gameScreen.style.display = "flex"

})



//enemyIntervalAttack()
//getNewSequence()

