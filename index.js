const  Pieces  = {
    WHITE_PAWN: '♙',
    WHITE_ROOK: '♖',
    WHITE_KNIGHT: '♘',
    WHITE_BISHOP: '♗',
    WHITE_QUEEN: '♕',
    WHITE_KING: '♔',

    BLACK_PAWN: '♟',
    BLACK_ROOK: '♜',
    BLACK_KNIGHT: '♞',
    BLACK_BISHOP: '♝',
    BLACK_QUEEN : '♛',
    BLACK_KING: '♚'
}

const board = [
    [Pieces.BLACK_ROOK, Pieces.BLACK_KNIGHT, Pieces.BLACK_BISHOP, Pieces.BLACK_QUEEN, Pieces.BLACK_KING, Pieces.BLACK_BISHOP, Pieces.BLACK_KNIGHT, Pieces.BLACK_ROOK], 
    [Pieces.BLACK_PAWN,Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN,Pieces. BLACK_PAWN, Pieces.BLACK_PAWN],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [Pieces.WHITE_PAWN,Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN,Pieces. WHITE_PAWN, Pieces.WHITE_PAWN],
    [Pieces.WHITE_ROOK, Pieces.WHITE_KNIGHT, Pieces.WHITE_BISHOP, Pieces.WHITE_QUEEN, Pieces.WHITE_KING, Pieces.WHITE_BISHOP, Pieces.WHITE_KNIGHT, Pieces.WHITE_ROOK], 
]



const getBoardState = function() {
    const pieces = document.querySelectorAll(".piece");
    let updatedBoard = [];
    pieces.forEach(piece => {board.push(piece.innerText)});


    console.log(updatedBoard);
    return updatedBoard
}

const displayController = (function() {

    const container = document.querySelector(".container")
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


    let dragged;

    board.forEach((row, rowIndex) => row.forEach((_, columnIndex)=> {

        const square = document.createElement("div")
        
        square.classList.add("square")
        const squareIndex = columns[columnIndex] + (8 - rowIndex);
        square.id = squareIndex
        
            const piece = document.createElement("div")  
            piece.classList.add("piece")
            piece.draggable = true
            piece.innerHTML = board[rowIndex][columnIndex]
            square.appendChild(piece)
       
            piece.addEventListener("dragstart", (e) => {
                dragged = e.target

            })
        
    
        square.addEventListener("dragover", (e) => {
            e.preventDefault();
            false
        }) 

        square.addEventListener("drop", (e) => {
            e.preventDefault();
            
            e.target.appendChild(dragged)
            board = getBoardState()
        })
        
        const marking = document.createElement("p")
        marking.classList.add("marking")
        marking.innerHTML = square.id
        square.appendChild(marking)

        container.appendChild(square)
    } ))
})()