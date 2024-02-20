const gameBoard = (function () {
    const rows = 8;
    const columns = 8;


    const board = new Array(rows).fill().map(() => Array(columns).fill(""))
  
    const getBoard = () => board

    //puts pieces on board 
    const pieces = [
        ["T", "H", "B", "Q", "K", "B", "H", "T"], 
        ["P", "P", "P", "P", "P", "P", "P", "P"],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '']]

    
    const half = Math.ceil(board.length / 2);

    const white = board.slice(0, half)
    .map((row, index) => row = pieces[index])

    const blacks = white.toReversed()

    const addedPieces = [...white, ...blacks]

    board.forEach((_, index) => board[index] = addedPieces[index])

    const getAddedPieces = () => addedPieces
    return {getAddedPieces, getBoard}
})()

const gameContorller = (function () {
   
})()

const displayController = (function () {
    const addedPieces = gameBoard.getAddedPieces()
    const board = gameBoard.getBoard()
    const container = document.querySelector(".container")

    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    let dragged;
    board.forEach((row, rowIndex) => row.forEach((_, columnIndex) => {
        const square = document.createElement("div")
        
        square.classList.add("square")
        const squareIndex = columns[columnIndex] + (8 - rowIndex);
        square.id = squareIndex
        
        if ( addedPieces[rowIndex][columnIndex] !== "") {
            const piece = document.createElement("div")
            piece.id = squareIndex   
            piece.classList.add("piece")
            piece.draggable = true
            piece.innerHTML = addedPieces[rowIndex][columnIndex]
            square.appendChild(piece)
       
            piece.addEventListener("dragstart", (e) => {
                dragged = e.target
            })
        
        }
       
        square.addEventListener("dragover", (e) => {
            e.preventDefault();
            false
        }) 

        square.addEventListener("drop", (e) => {
            e.preventDefault();
            e.target.appendChild(dragged)
        })
        
        const marking = document.createElement("p")
        marking.classList.add("marking")
        marking.innerHTML = square.id
        square.appendChild(marking)

        container.appendChild(square)
    })
    ) 
})()

