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
        if (player.health <= 0) {
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
    ArrowUp: 0,
    ArrowDown: 1,
    ArrowLeft: 2,
    ArrowRight: 3
}

const arrowImages = {
    0: "./src/arrow-up",
    1: "./src/arrow-down",
    2: "./src/arrow-left",
    3: "./src/arrow-right"
}

const controls = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"]

const playerInput = []

currentEnemy = new Enemy()

let arrowIndex = 0
let startbutton = document.getElementById("start-button")
let mainMenu = document.getElementById("main-container")
let gameScreen = document.getElementById("game-container")
let arrowsImg = document.getElementById("arrow-container")
let playerHp = document.getElementById("playerHP")
let killCount = document.getElementById("score")
let hero = document.getElementById("hero")
let enemy = document.getElementById("enemy")



//Game mechanics functions//////////////////////////////////////////

function getNewSequence() {
    arrowArr = []
    let arraylength = (4 + Math.floor(score / 3))
    for (let i = 0; i < arraylength; i++) {
        arrowArr.push(Math.floor(Math.random() * 4))

    }
    arrowIndex = 0
    showArrows()
}

function showArrows() {
    arrowsImg.innerHTML = ""
    arrowsImg.className = "fade-in"
    arrowArr.forEach((value, i) => {
        const img = document.createElement("img")

        if (i === arrowIndex) {
            img.src = `${arrowImages[value]}_active.png`
        } else if (i < arrowIndex) {
            img.src = `${arrowImages[value]}_true.png`
            img.style.opacity = `50`
        } else {
            img.src = `${arrowImages[value]}.png`
        }

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

    playerScore.innerText = `x ${score}`
}

function checkInputs(eventKey) {

    if (arrowArr[arrowIndex] === keyMap[eventKey]) {
        arrowIndex++
        showArrows()
        if (arrowIndex === arrowArr.length) {
            correctInput()
        }

    } else {
        wrongInput()
        arrowIndex = 0
        showArrows()
    }
}


function wrongInput() {
    enemyIntervalAttack()
    animateEnemyAttack()
    animateReceivedDamage()
    player.health -= currentEnemy.power
    player.checkPlayerHealth()
    showPlayerHp()
}

function correctInput() {
    animateAttack()
    enemyIntervalAttack()
    animateEnemyReceivedDamage()
    damageEnemy()
    currentEnemy.checkEnemyHealth()
    showEnemyHp()
    getNewSequence()
}
//Sounds/////////////////////////////////////////////////////////////

function playMusic() {
    var audio = new Audio('src/sounds/battle.ogg');
    audio.volume = 0.3;
    audio.loop = true
    audio.play();

}


//Player functions//////////////////////////////////////////////////


function damagePlayer() {
    player.health = (player.health - currentEnemy.power)
    animateEnemyAttack()
    animateReceivedDamage()
    player.checkPlayerHealth()
    showPlayerHp()

}

function animateAttack() {
    hero.className = "animated attack"

    setTimeout(() => {
        hero.className = "animated idle"
    }, 500);
}

function animateReceivedDamage() {
    hero.className = "animated hurt"

    setTimeout(() => {
        hero.className = "animated idle"
    }, 500);
}


function killPlayer() {
    if (player.health <= 0) {
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

// Enemy functions/////////////////////////////////////////////

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
    }, 3000)
}

function animateEnemyAttack() {
    enemy.className = "animated attack"

    setTimeout(() => {
        enemy.className = "animated idle"
    }, 500);
}

function animateEnemyReceivedDamage() {
    enemy.className = "animated hurt"

    setTimeout(() => {
        enemy.className = "animated idle"
    }, 500);
}

function damageEnemy() {

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
    showScore()
    enemyArr.pop()
    generateNewEnemy()
    showEnemyHp()
    showEnemyDmg()

}

//Event Listeners

startbutton.addEventListener("click", () => {

    // enemyIntervalAttack()  <-- desactivado de inicio para dar tiempo al player.
    playMusic()
    showScore()
    showPlayerHp()
    showEnemyHp()
    showEnemyDmg()
    getNewSequence()
    mainMenu.style.display = "none"
    gameScreen.style.display = "flex"

})

document.addEventListener('keydown', function (event) {
    if (controls.includes(event.key)) {
        checkInputs(event.key)
    }
})



