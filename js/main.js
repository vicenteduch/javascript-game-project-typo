class Enemy {
    constructor() {
        this.health = 10 + Math.floor(score / 3);
        this.power = 10 + Math.floor(score / 3);
    }

    checkEnemyHealth() {
        if (this.health <= 0) {
            killEnemy()
        }
    }

}


//keeping console logs for future tests


let score = 0
const enemyArr = []
let arrowArr = []




let currentEnemy = new Enemy();
//console.log(`Hello! Im the first enemy and my hp is ` + currentEnemy.health)


function generateNewEnemy() {
    const newEnemy = new Enemy();
    enemyArr.push(newEnemy)
    currentEnemy = newEnemy

    // console.log("Hello im a new Enemy! and my hp is " + currentEnemy.health)

}

function killEnemy() {
    // console.log("this enemy takes 10 damage")
    score++
    currentEnemy.health = 0
    // console.log("your score is " + score)
    enemyArr.pop()
    generateNewEnemy();
}

currentEnemy = new Enemy();
let arrowIndex = 0

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

const keyMap = {
    ArrowUp: 0,  // arrowUp ^
    ArrowDown: 1,  // arrowDown v
    ArrowLeft: 2,  // arrowLeft <
    ArrowRight: 3   // arrowRight >
};

const controls = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"]
const playerInput = [];




function checkInputs(eventKey) {

    if (arrowArr[arrowIndex] === keyMap[eventKey]) {
        arrowIndex++
        if (arrowIndex === arrowArr.length) {
            score++
            getNewSequence()
        }

        console.log("ACIERTO!")

    } else {
        //fail
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


