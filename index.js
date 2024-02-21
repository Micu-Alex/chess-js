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

let board = [
    [Pieces.BLACK_ROOK, Pieces.BLACK_KNIGHT, Pieces.BLACK_BISHOP, Pieces.BLACK_QUEEN, Pieces.BLACK_KING, Pieces.BLACK_BISHOP, Pieces.BLACK_KNIGHT, Pieces.BLACK_ROOK], 
    [Pieces.BLACK_PAWN,Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN,Pieces. BLACK_PAWN, Pieces.BLACK_PAWN],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [Pieces.WHITE_PAWN,Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN,Pieces. WHITE_PAWN, Pieces.WHITE_PAWN],
    [Pieces.WHITE_ROOK, Pieces.WHITE_KNIGHT, Pieces.WHITE_BISHOP, Pieces.WHITE_QUEEN, Pieces.WHITE_KING, Pieces.WHITE_BISHOP, Pieces.WHITE_KNIGHT, Pieces.WHITE_ROOK], 
]


const displayController = (function() {

    const container = document.querySelector(".container")
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const rows = ["8", "7", "6", "5", "4", "3", "2", "1" ];
    let dragged;




    board.forEach((row, rowIndex) => row.forEach((_, columnIndex)=> {

        const square = document.createElement("div")
        
        square.classList.add("square")
        const squareIndex = columns[columnIndex] + rows[rowIndex];
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

            const dropRowIndex = rows.indexOf(square.id.charAt(1))
            const dropColumnIndex = columns.indexOf(square.id.charAt(0));
            board[dropRowIndex][dropColumnIndex] = dragged.innerText;

            console.log(dragged.parentElement);

            console.log(board);
        })
        
        const marking = document.createElement("p")
        marking.classList.add("marking")
        marking.innerHTML = square.id
        square.appendChild(marking)

        container.appendChild(square)
    } ))
})()
