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
