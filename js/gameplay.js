////GAME MECHANICS////

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
        playSound(pressKey)
        arrowIndex++
        showArrows()
        if (arrowIndex === arrowArr.length) {
            correctInput()
        }

    } else {
        wrongInput()
        playSound(wrongKey)
        arrowIndex = 0
        showArrows()
    }
}


function wrongInput() {
    enemyIntervalAttack()
    animateEnemyAttack()
    animateReceivedDamage()
    playSound(enemyAttack)
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

////SOUNDS////

function playMusic() {
    var audio = new Audio('media/sounds/battle.ogg')
    audio.volume = 0.05
    audio.loop = true
    audio.play()

}



function playSound(sound) {
    sound.volume = 0.2
    sound.play()
}

