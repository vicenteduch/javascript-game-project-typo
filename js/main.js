
//classes

class Enemy {
    constructor() {
        this.health = (3 + Math.floor(score / 3));
        this.power = (1 + Math.floor(score / 3));
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
        this.power = Math.floor(Math.random() * 3) + 1
    }

    checkPlayerHealth() {
        console.log(player.health)
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

const player = new Player();

let currentEnemy = new Enemy();

const keyMap = {
    ArrowUp: 0,  // arrowUp ^
    ArrowDown: 1,  // arrowDown v
    ArrowLeft: 2,  // arrowLeft <
    ArrowRight: 3   // arrowRight >
};

const controls = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"]

const playerInput = [];

console.log(`Hello! im a new player and my hp is ` + player.health + ` and my power is ` + player.power)
console.log(`Hello! Im the first enemy, my hp is ` + currentEnemy.health + ` and my power is ` + currentEnemy.power)

//Functions

currentEnemy = new Enemy();
let arrowIndex = 0


function generateNewEnemy() {
    console.log("hi im a new Enemy")
    const newEnemy = new Enemy();
    currentEnemy = newEnemy
    enemyArr.push(newEnemy)

}

function killEnemy() {
    // console.log("this enemy takes 10 damage")
    score++
    enemyArr.pop()
    generateNewEnemy();
    console.log(score)
}

function killPlayer() {
    if (player.health <= 0) {
        alert("Game Over")
    }
}


function getNewSequence() {
    arrowArr = []
    let arraylength = (4 + Math.floor(score / 3))
    for (let i = 0; i < arraylength; i++) {
        arrowArr.push(Math.floor(Math.random() * 4))

    }
    arrowIndex = 0

    console.log(arrowArr)
}

getNewSequence()


document.addEventListener('keydown', function (event) {
    if (controls.includes(event.key)) {
        checkInputs(event.key)
    }
});




function damagePlayer() {
    player.health = (player.health - currentEnemy.power)
}

function damageEnemy() {
    currentEnemy.health = (currentEnemy.health - player.power)
}



function checkInputs(eventKey) {

    if (arrowArr[arrowIndex] === keyMap[eventKey]) {
        arrowIndex++
        if (arrowIndex === arrowArr.length) {
            damageEnemy()
            currentEnemy.checkEnemyHealth()
            console.log("Enemy HP is ", currentEnemy.health)
            getNewSequence()
        }

        console.log("ACIERTO!")
      

    } else {
        damagePlayer()
        player.checkPlayerHealth()
        console.log("player has " + player.health + "hp")
        console.log("FALLO!")
        arrowIndex = 0
    }


}





/* 
killEnemy()
killEnemy()
killEnemy()
console.log(score)
killEnemy()
killEnemy()
killEnemy()
console.log(score)
killEnemy()
killEnemy()
killEnemy()
console.log(score) 
*/


