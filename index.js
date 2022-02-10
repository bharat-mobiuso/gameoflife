const canvas = document.querySelector("#gamefield")
const ctx = canvas.getContext("2d")

const game = new controller()

window.onload = () => {

    document.querySelector("#start-random").addEventListener("click", () => {
        game.gameSetUp();
    })

    document.querySelector("#stop").addEventListener("click", () => {
        game.stopGame();
    })
}