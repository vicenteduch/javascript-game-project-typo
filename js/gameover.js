addEventListener("DOMContentLoaded", function () {
    let totalScore = localStorage.getItem("finalScore")
    let showTotalScore = document.getElementById("total-score")
    showTotalScore.innerText = `Final Score: ${totalScore}`
    gameoverMusic()
})

function gameoverMusic() {
    var audio = new Audio('media/sounds/gameover-music.ogg')
    audio.volume = 0.2
    audio.loop = true
    audio.play()
}

const playAgainButton = document.getElementById("playAgain-button")

playAgainButton.addEventListener("click", () => {  // Game Start
   
    sound.pause()
    sound.currentTime = 0
    showScore()
  

})