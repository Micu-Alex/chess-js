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
let validMove = false;
let isWhiteTurn = true;




const displayController = (function() {

    const container = document.querySelector(".container")
    let dragged;

    function handleDrop(e, square) {
        gameControl(dragged, square)
        
        e.preventDefault();
        const isWhite = isPieceWhite(dragged.innerText);

        const attackedPiece = square.querySelector(".piece");
        if (validMove && ((isWhite && isWhiteTurn) || (!isWhite && !isWhiteTurn))) {
            e.target.appendChild(dragged);
            changeTurn()
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


const changeTurn = function () {
        isWhiteTurn = !isWhiteTurn; 
}


const gameControl = function (dragged, square,) {
    
    const prevRowIndex = rows.indexOf(dragged.parentElement.id.charAt(1));
    const prevColumnIndex = columns.indexOf(dragged.parentElement.id.charAt(0));
    
    const nextRowIndex = rows.indexOf(square.id.charAt(1));
    const nextColumnIndex = columns.indexOf(square.id.charAt(0));
    
    const isWhite = isPieceWhite(dragged.innerText);
    const piceType = getPieceType(dragged.innerText);
    
    
    validMove = isValidMove(piceType, prevColumnIndex, nextColumnIndex, prevRowIndex, nextRowIndex, isWhite );
    
    if (validMove && ((isWhite && isWhiteTurn) || (!isWhite && !isWhiteTurn))) {
        updateBoardState(dragged, prevRowIndex, prevColumnIndex, nextRowIndex, nextColumnIndex);  
       
    }

    const isWhiteInCheck = isInCheck('white');
    const isblackInCheck = isInCheck('black');
    
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
    if (isSameColor(nextCol,  nextRow, isWhite) && board[nextRow][nextCol] !== "") {
        return false
    }
    switch (piceType) {
        case "pawn":
           return isValidPownMove(prevCol, nextCol, prevRow, nextRow, isWhite);
        case "rook":
         return isValidRookMove(prevCol, nextCol, prevRow, nextRow, isWhite); 
        case "knight":
            return isValidKnightMove(prevCol, nextCol, prevRow, nextRow);
        case "bishop":
           return isValidBishopMove(prevCol, nextCol, prevRow, nextRow)
        case "queen":
           return isValidQueenMove(prevCol, nextCol, prevRow, nextRow)
        case "king":
            return isValidKingMove(prevCol, nextCol, prevRow, nextRow)
        default:
            return false;
    };
};


const isValidPownMove = function (prevCol, nextCol, prevRow, nextRow, isWhite) {
    const direction = isWhite ? -1 : 1
 
    // Moving forward one square
    if (prevCol === nextCol && board[nextRow][nextCol] === "")  {
        if (nextRow === prevRow + direction) {
            return true;
        };

    // Moving forward two squares from starting position
    if ((isWhite ? 6 : 1) ===  prevRow && nextRow === prevRow + 2 * direction  && board[prevRow + direction][prevCol] === "" && board[nextRow][nextCol] === "") {
        return true;
       };
    };

    // Capturing diagonally
    if (Math.abs(nextCol- prevCol) === 1 && nextRow === prevRow + direction && board[nextRow][nextCol] !== "") {
        return true;
    };

    return false;
};


const isValidRookMove = function (prevCol, nextCol, prevRow, nextRow) {
 // Check if moving vertically (same column)
    if (prevCol === nextCol) {
        const step = prevRow < nextRow ? 1 : -1;
        for (let i = prevRow + step; i !== nextRow; i += step) {
            if(board[i][prevCol] !== "") {
                return false;
            };
        } ;
        return true;
    }; 

    // Check if moving horizontally (same row)
    if (prevRow === nextRow) {
        const step = prevCol < nextCol ? 1 : -1;
        for (let i = prevCol + step; i !== nextCol; i += step) {
            if (board[prevRow][i] !== "") {
                return false;
            };
        };
        return true;
    };
    return false;
};


const isValidKnightMove = function(prevCol, nextCol, prevRow, nextRow) {
    // Check if the move is L-shaped: vertical L
    if (Math.abs(nextCol- prevCol) === 1 && (nextRow === prevRow +2 || nextRow === prevRow -2) ) {
        return true;
    }; 

    // Check if the move is L-shaped: horizontal L
    if (Math.abs(nextRow - prevRow) === 1 & (nextCol === prevCol + 2 || nextCol === prevCol - 2 )) {
        return true;
    }; 
    return false;
};


const isValidBishopMove = function(prevCol, nextCol, prevRow, nextRow) {
    
    // Check if the move is diagonal
    if (Math.abs(prevRow - nextRow) === Math.abs(prevCol - nextCol)) {
   const rowStep = prevRow < nextRow ? 1 : -1;
   const colStep = prevCol < nextCol ? 1 : -1;

    // Iterate over the squares along the diagonal path
   for (let i = prevRow + rowStep, j = prevCol + colStep; i !== nextRow; i += rowStep, j += colStep) {
    if (board[i][j] !== "") {
        return false;
    };
   } return true;
 }; 
 return false
};


const isValidQueenMove = function(prevCol, nextCol, prevRow, nextRow) {
    // Check if the move is diagonal
    if (Math.abs(prevRow - nextRow) === Math.abs(prevCol - nextCol)) {
        const rowStep = prevRow < nextRow ? 1 : -1;
        const colStep = prevCol < nextCol ? 1 : -1;

      // Iterate over the squares along the diagonal path
        for (let i = prevRow + rowStep, j = prevCol + colStep; i !== nextRow; i += rowStep, j += colStep) {
         if (board[i][j] !== "") {
             return false;
         };
        } return true;
      }; 

    // Check if moving vertically (same column)
    if (prevCol === nextCol) {
        const step = prevRow < nextRow ? 1 : -1;
        for (let i = prevRow + step; i !== nextRow; i += step) {
            if(board[i][prevCol] !== "") {
                return false;
            };
        } ;
        return true;
    }; 

    // Check if moving horizontally (same row)
    if (prevRow === nextRow) {
        const step = prevCol < nextCol ? 1 : -1;
        for (let i = prevCol + step; i !== nextCol; i += step) {
            if (board[prevRow][i] !== "") {
                return false;
            };
        };
        return true;
    };
    return false;


      
};

const isValidKingMove = function(prevCol, nextCol, prevRow, nextRow) {
   if (Math.abs(nextRow - prevRow) === 1 && Math.abs(nextCol - prevCol) <= 1 ) {
        return true
   };
   return false
}


const isInCheck = function (color) {
    // Find the king's position
    const kingSymbol = color === 'white' ? Pieces.WHITE_KING : Pieces.BLACK_KING;
    const kingPosition = findPiecePosition(kingSymbol);

    // Check if any opposing pieces can legally capture the king
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const pieceSymbol = board[i][j];
           
            if (isPieceWhite(pieceSymbol) !== (color === 'white') && isValidMove(getPieceType(pieceSymbol), j, kingPosition.column, i, kingPosition.row, isPieceWhite(pieceSymbol))) {
                return true; // The king is in check

            }
        }
    }

    return false; // The king is not in check
};


// Function to find the position of a piece on the board
const findPiecePosition = function (pieceSymbol) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] === pieceSymbol) {
                return { row: i, column: j };
            }
        }
    }
    return null; // Piece not found
};


const isSameColor = function(nextCol,  nextRow, isWhite) {
     // Check if the move is within one square horizontally or vertically
    if ( isPieceWhite(board[nextRow][nextCol]) === isWhite ) {
        return true;
    };
     return false
};

const updateBoardState = function(dragged, prevRowIndex, prevColumnIndex, nextRowIndex, nextColumnIndex) {

//clear the prev space of piece on table 
    board[prevRowIndex][prevColumnIndex] = ""
//add piece to new space 
    board[nextRowIndex][nextColumnIndex] = dragged.innerText;
};