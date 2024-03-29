import { Pieces } from "./constants.js";
import { board } from "./constants.js";
import { isValidPownMove, isValidRookMove, isValidKnightMove, isValidBishopMove, isValidQueenMove, isValidKingMove } from "./moveValidation.js";
import { setIsWhiteTurn, getIsWhiteTurn } from "./gameData.js";


// Function to check if a given piece is white
export const isPieceWhite = function (piece) {
    return (
        piece === Pieces.WHITE_PAWN ||
        piece === Pieces.WHITE_ROOK ||
        piece === Pieces.WHITE_KNIGHT ||
        piece === Pieces.WHITE_BISHOP ||
        piece === Pieces.WHITE_QUEEN ||
        piece === Pieces.WHITE_KING
        );
    };

// Function to get the type of a piece based on its symbol
export const getPieceType = function (piece) {
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

// Function to validate a move based on piece type and current and destination positions
export const isValidMove = function (pieceType, prevCol, nextCol, prevRow, nextRow, isWhite)  {

    // Helper function to check if the next position has a piece of the same color
    const isSameColor = function(nextCol,  nextRow, isWhite) {
       return isPieceWhite(board[nextRow][nextCol]) === isWhite 
    };

    if (isSameColor(nextCol,  nextRow, isWhite) && board[nextRow][nextCol] !== "") {
        return false // Invalid move if destination has a piece of the same color
    }

    // Check validity based on piece type
    switch (pieceType) {
        case "pawn":
           return isValidPownMove(prevCol, nextCol, prevRow, nextRow, isWhite);
        case "rook":
         return isValidRookMove(prevCol, nextCol, prevRow, nextRow, isWhite); 
        case "knight":
            return isValidKnightMove(prevCol, nextCol, prevRow, nextRow);
        case "bishop":
           return isValidBishopMove(prevCol, nextCol, prevRow, nextRow);
        case "queen":
           return isValidQueenMove(prevCol, nextCol, prevRow, nextRow);
        case "king":
            return isValidKingMove(prevCol, nextCol, prevRow, nextRow);
        default :
            return false
    };
};

// Function to update the board state after a move
export const updateBoardState = function(dragged, prevRowIndex, prevColumnIndex, nextRowIndex, nextColumnIndex) {
    // Clear the prev space of piece on table 
        board[prevRowIndex][prevColumnIndex] = ""
    // Add piece to new space 
        board[nextRowIndex][nextColumnIndex] = dragged.innerText;
    }; 


// Function to update the board display after a move
export const updateBoardDisplay = function(event, square, dragged) {

    const attackedPiece = square.querySelector(".piece");
    
    event.target.appendChild(dragged);
    if (attackedPiece) {
        attackedPiece.replaceWith(dragged)
    }
}

// Function to check if the king of a given color is in check
export const isInCheck = function (color, customBoard  ) {
    const boardToSearch = customBoard || board
    // Find the king's position
    const kingSymbol = color === 'white' ? Pieces.WHITE_KING : Pieces.BLACK_KING;
    const kingPosition = findPiecePosition(kingSymbol, boardToSearch);

    // Check if any opposing pieces can legally capture the king
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const pieceSymbol = boardToSearch[i][j];
            if (
                pieceSymbol !== "" &&
                isPieceWhite(pieceSymbol) !== (color === 'white') &&
                isValidMove(getPieceType(pieceSymbol), j, kingPosition.column, i, kingPosition.row, isPieceWhite(pieceSymbol))
                ) {
                if (customBoard) {
                    console.log("magic board" ,customBoard);
                 } 
                return true; // The king is in check
            }
        }
    }

    return false; // The king is not in check
};

// Function to find the position of a piece on the board
export const findPiecePosition = function (pieceSymbol, customBoard) {
    const boardToSearch = customBoard || board;

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (boardToSearch[i][j] === pieceSymbol) {
                return { row: i, column: j };
            }
        }
    }
    return null; // Piece not found
};

// Function to change the turn from white to black and vice versa
export const changeTurn = function () {
    const isWhiteTurn = getIsWhiteTurn()
    setIsWhiteTurn(!isWhiteTurn) ; 
}

export const getAllAvailableMoves = function (pieceType, col, row, isWhite) {
    const availableMoves = [];
    const kingColor = isWhite ? 'white' : 'black';
    const isKingInCheck = isInCheck(kingColor);

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (isValidMove(pieceType, col, j, row, i, isWhite)) {
                // Make the move on a temporary board
                const tempBoard = board.map(row => row.slice());
                tempBoard[i][j] = tempBoard[row][col];
                tempBoard[row][col] = "";

                // Check if the move results in a valid board state
                const stillInCheck = isInCheck(kingColor, tempBoard);

                // If the king is not in check after the move, or the king is not currently in check
                if ((!stillInCheck && isKingInCheck) || !isKingInCheck) {
                    availableMoves.push({ col: j, row: i });
                }
            }
        }
    }

    return availableMoves;
};