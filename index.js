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
};

let board = [
    [Pieces.BLACK_ROOK, Pieces.BLACK_KNIGHT, Pieces.BLACK_BISHOP, Pieces.BLACK_QUEEN, Pieces.BLACK_KING, Pieces.BLACK_BISHOP, Pieces.BLACK_KNIGHT, Pieces.BLACK_ROOK], 
    [Pieces.BLACK_PAWN,Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN,Pieces. BLACK_PAWN, Pieces.BLACK_PAWN],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    [Pieces.WHITE_PAWN,Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN,Pieces. WHITE_PAWN, Pieces.WHITE_PAWN],
    [Pieces.WHITE_ROOK, Pieces.WHITE_KNIGHT, Pieces.WHITE_BISHOP, Pieces.WHITE_QUEEN, Pieces.WHITE_KING, Pieces.WHITE_BISHOP, Pieces.WHITE_KNIGHT, Pieces.WHITE_ROOK], 
];
const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const rows = ["8", "7", "6", "5", "4", "3", "2", "1" ];
let validMove = false


const displayController = (function() {

    const container = document.querySelector(".container")
    let dragged;

    function handleDrop(e, square) {
        gameControl(dragged, square)
        
        e.preventDefault();

        const attackedPiece = square.querySelector(".piece");
        if (validMove) {
            e.target.appendChild(dragged);
            if (attackedPiece) {
                attackedPiece.replaceWith(dragged)
            }
        }
        
        console.log(board);
    }

    board.forEach((row, rowIndex) => row.forEach((_, columnIndex)=> {

        const square = document.createElement("div");
        
        square.classList.add("square");
        const squareIndex = columns[columnIndex] + rows[rowIndex];
        square.id = squareIndex;
        
        if (board[rowIndex][columnIndex] !== "") {

            const piece = document.createElement("div")  ;
            piece.classList.add("piece");
            piece.draggable = true;
            piece.innerHTML = board[rowIndex][columnIndex];
            square.appendChild(piece);
        
            piece.addEventListener("dragstart", (e) => {
                dragged = e.target;
    
            });
        };
        
    
        square.addEventListener("dragover", (e) => {
            e.preventDefault();
            false;
        });

        square.addEventListener("drop", (e) => {
            handleDrop(e, square);
        });
        
        const marking = document.createElement("p");
        marking.classList.add("marking");
        marking.innerHTML = square.id;
        square.appendChild(marking);

        container.appendChild(square);
    }));
})();


const gameControl = function (dragged, square,) {

    const prevRowIndex = rows.indexOf(dragged.parentElement.id.charAt(1));
    const prevColumnIndex = columns.indexOf(dragged.parentElement.id.charAt(0));

    const nextRowIndex = rows.indexOf(square.id.charAt(1));
    const nextColumnIndex = columns.indexOf(square.id.charAt(0));

    const isWhite = isPieceWhite(dragged.innerText);
    const piceType = getPieceType(dragged.innerText);

    validMove = isValidMove(piceType, prevColumnIndex, nextColumnIndex, prevRowIndex, nextRowIndex, isWhite );

    if (validMove) {
        updateBoardState(dragged, prevRowIndex, prevColumnIndex, nextRowIndex, nextColumnIndex );
    } 
} 


const isPieceWhite = function (piece) {
    return (
        piece === Pieces.WHITE_PAWN ||
        piece === Pieces.WHITE_ROOK ||
        piece === Pieces.WHITE_KNIGHT ||
        piece === Pieces.WHITE_BISHOP ||
        piece === Pieces.WHITE_QUEEN ||
        piece === Pieces.WHITE_KING
        );
    };


const getPieceType = function (piece) {
    switch (piece) {
        case Pieces.WHITE_PAWN:
        case Pieces.BLACK_PAWN:
            return "pawn";

        case Pieces.WHITE_ROOK:
        case Pieces.BLACK_ROOK:
            return "rook"
        
        case Pieces.WHITE_KNIGHT:
        case Pieces.BLACK_KNIGHT:
            return "knight"
        
        case Pieces.WHITE_BISHOP:
        case Pieces.BLACK_BISHOP:
            return "bishop"

        case Pieces.WHITE_QUEEN:
        case Pieces.BLACK_QUEEN:
            return "queen"

        case Pieces.WHITE_KING:
        case Pieces.BLACK_KING:
            return "king"
    }
}


const isValidMove = function (piceType, prevCol, nextCol, prevRow, nextRow, isWhite)  {
    if (isSameColor(nextCol,  nextRow, isWhite)) {
        return false
    }
    switch (piceType) {
        case "pawn":
           return isValidPownMove(prevCol, nextCol, prevRow, nextRow, isWhite);
        case "rook":
         return isValidRookMove(prevCol, nextCol, prevRow, nextRow, isWhite); 
        case "knight":
      
        case "bishop":
      
        case "queen":
     
        case "king":

        default:
            return false;
    }
}


const isValidPownMove = function (prevCol, nextCol, prevRow, nextRow, isWhite) {
    const direction = isWhite ? -1 : 1

    if (prevCol === nextCol && board[nextRow][nextCol] === "")  {
        if (nextRow === prevRow + direction) {
            return true;
        };

       if ((isWhite ? 6 : 1) ===  prevRow && nextRow === prevRow + 2 * direction ) {
        return true;
       };
    }


    if (Math.abs(nextCol- prevCol) === 1 && nextRow === prevRow + direction && board[nextRow][nextCol] !== "") {
        return true
    }

    return false
};


const isValidRookMove = function (prevCol, nextCol, prevRow, nextRow, isWhite) {
    
    if (prevCol === nextCol || prevRow === nextRow) {
        return true;
    } 
    return false;
};


const isSameColor = function (nextCol,  nextRow, isWhite) {
    if (board[nextRow][nextCol] !== "" && isPieceWhite(board[nextRow][nextCol]) === isWhite) {
        return true;
    } return false
}


//need to some how update the isValidMove wiht theis ifon
const updateBoardState = function (dragged, prevRowIndex, prevColumnIndex, nextRowIndex, nextColumnIndex) {

//clear the prev space of piece on table 
    board[prevRowIndex][prevColumnIndex] = ""
//add piece to new space 
    board[nextRowIndex][nextColumnIndex] = dragged.innerText;
};