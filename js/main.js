////CLASSES////

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
        this.health = 20
        this.power = 2
    }

    checkPlayerHealth() {
        if (player.health <= 0) {
            killPlayer()
        }
    }
}

////VARIABLES////

let score = 0
const enemyArr = []
let arrowArr = []
const player = new Player()
let currentEnemy = new Enemy()
currentEnemy = new Enemy()

const keyMap = {
    ArrowUp: 0,
    ArrowDown: 1,
    ArrowLeft: 2,
    ArrowRight: 3
}

const arrowImages = {
    0: "./media/arrow-up",
    1: "./media/arrow-down",
    2: "./media/arrow-left",
    3: "./media/arrow-right"
}

const controls = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"]
const playerInput = []
let arrowIndex = 0
const startbutton = document.getElementById("start-button")
const mainMenu = document.getElementById("main-container")
const gameScreen = document.getElementById("game-container")
const arrowsImg = document.getElementById("arrow-container")
const playerHp = document.getElementById("playerHP")
const killCount = document.getElementById("score")
const hero = document.getElementById("hero")
const enemy = document.getElementById("enemy")

const pressKey = new Audio('media/sounds/pressed-key.wav')
const attack = new Audio('media/sounds/attack-sound.wav')
const enemyAttack = new Audio('media/sounds/enemy-attack-sound.wav')
const wrongKey = new Audio('media/sounds/wrong-key.wav')
const enemyDie = new Audio('media/sounds/enemy-die.wav')


////PLAYER FUNCTIONALITY////


function damagePlayer() {
    player.health = (player.health - currentEnemy.power)
    playSound(enemyAttack)
    animateEnemyAttack()
    animateReceivedDamage()
    player.checkPlayerHealth()
    showPlayerHp()

}

function animateAttack() {
    hero.className = "animated attack"

    setTimeout(() => {
        hero.className = "animated idle"
    }, 500)
}

function animateReceivedDamage() {
    hero.className = "animated hurt"

    setTimeout(() => {
        hero.className = "animated idle"
    }, 500)
}


function killPlayer() {

    if (player.health <= 0) {
        localStorage.setItem('finalScore', score)
        location.href = "gameover.html"


    }
}

function showPlayerHp() {
    let playerHitPoints = document.getElementById("playerHP")
    let remainingHp = document.getElementById("remainingHp")

    if (!remainingHp) {
        remainingHp = document.createElement("h2")
        remainingHp.id = "remainingHp"
        remainingHp.style.color = "white"
        playerHitPoints.appendChild(remainingHp)
    }

    remainingHp.innerText = `${player.health} HP`
}

////ENEMY FUNCTIONALITY////

function generateNewEnemy() {
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
    }, 2500)
}

function animateEnemyAttack() {
    enemy.className = "animated attack"

    setTimeout(() => {
        enemy.className = "animated idle"
    }, 500)
}

function animateEnemyDeath() {
    enemy.className = "animated die"
    setTimeout(() => {
        enemy.className = "animated idle"
    }, 1000)
}

function animateEnemyReceivedDamage() {
    enemy.className = "animated hurt"

    setTimeout(() => {
        enemy.className = "animated idle"
    }, 500)
}

function damageEnemy() {
    playSound(attack)
    currentEnemy.health = (currentEnemy.health - player.power)

}

function showEnemyHp() {
    let enemyHp = document.getElementById("enemyHP")
    let enemyRemainingHp = document.getElementById("enemyRemainingHp")

    if (!enemyRemainingHp) {
        enemyRemainingHp = document.createElement("h2")
        enemyRemainingHp.id = "enemyRemainingHp"
        enemyRemainingHp.style.color = "white"
        enemyHp.appendChild(enemyRemainingHp)
    }

    enemyRemainingHp.innerText = `${currentEnemy.health} HP`
}

function showEnemyDmg() {
    let enemyDmgCounter = document.getElementById("enemyDmg")
    let currentEnemyDmg = document.getElementById("currentEnemyDmg")

    if (!currentEnemyDmg) {
        currentEnemyDmg = document.createElement("h2")
        currentEnemyDmg.id = "currentEnemyDmg"
        currentEnemyDmg.style.color = "white"
        enemyDmgCounter.appendChild(currentEnemyDmg)
    }

    currentEnemyDmg.innerText = `x ${currentEnemy.power}`
}

function killEnemy() {
    score++
    playSound(enemyDie)
    animateEnemyDeath()
    showScore()
    enemyArr.pop()
    generateNewEnemy()
    showEnemyHp()
    showEnemyDmg()

}

//// EVENTS ////

document.addEventListener('keydown', function (event) {
    if (controls.includes(event.key)) {
        checkInputs(event.key)
    }
})


startbutton.addEventListener("click", () => {  // Game Start
    playMusic()
    showScore()
    showPlayerHp()
    showEnemyHp()
    showEnemyDmg()
    getNewSequence()
    mainMenu.style.display = "none"
    gameScreen.style.display = "flex"

})





