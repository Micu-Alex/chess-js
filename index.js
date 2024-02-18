const gameBoard = (function () {
    const board = new Array(64).fill("")
    const getBoard = () => board
    return {getBoard}
})()

const gameContorller = (function () {
    const pieces = [
        "T", "H", "B", "Q", "K", "B", "H", "T",
         "P", "P", "P", "P", "P", "P", "P", "P"]

    const board = gameBoard.getBoard()

    const white = board.slice(0, 32)
    const blacks = board.slice(32, 65)

   for(let i = 0; i < white.length / 2; i++ ) {
    white[i] = pieces[i]
   }
   const getWhite = () => white
   return {getWhite}

})()

const displayController = (function () {
    const white = gameContorller.getWhite()
    const board = gameBoard.getBoard()
    const container = document.querySelector(".container")

    board.forEach((_, index) => {const square = document.createElement("div")
    square.classList.add("square")
    square.id = index
    square.innerHTML = white[index]
    container.appendChild(square)
})
})()