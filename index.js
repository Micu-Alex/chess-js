const gameBoard = (function () {
    const board = new Array(64).fill("")
    const getBoard = () => board

    //puts pieces on board 
    const pieces = [
        "T", "H", "B", "Q", "K", "B", "H", "T",
         "P", "P", "P", "P", "P", "P", "P", "P"]
    
    const white = board.slice(0, 32)
    let blacks = board.slice(32, 65)
    
    for(let i = 0; i < white.length / 2; i++ ) {
    white[i] = pieces[i]
    }
    blacks = white.toReversed();
    const IndexOfK = blacks.findIndex(el => el === "K")
    
    blacks[IndexOfK] = "Q"
    blacks[IndexOfK + 1] = "K"
    
    console.log(blacks);
    
    const addedPieces = [...white, ...blacks]
    const getAddedPieces = () => addedPieces
    return {getAddedPieces, getBoard}
})()

const gameContorller = (function () {

})()

const displayController = (function () {
    const addedPieces = gameBoard.getAddedPieces()
    const board = gameBoard.getBoard()
    const container = document.querySelector(".container")

    board.forEach((_, index) => {const square = document.createElement("div")
    square.classList.add("square")
    square.id = index
    square.innerHTML = addedPieces[index]
    
    container.appendChild(square)
})
})()