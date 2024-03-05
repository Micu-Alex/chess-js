import { Pieces, columns, rows  } from "./constants.js";
import { getValidMove, setValidMove, getIsWhiteTurn, setKingInCheck, getKingInCheck } from "./gameData.js";
import {
    isPieceWhite,
    getPieceType,
    updateBoardState,
    changeTurn,
    isInCheck,
    findPiecePosition,
    updateBoardDisplay,
    getAllAvailableMoves
 } from "./utils.js";



const gameControl = function (dragged, square, event) {
     

    // Getting the row and column indices of the previous square where the piece was located
    const prevRowIndex = rows.indexOf(dragged.parentElement.id.charAt(1));
    const prevColumnIndex = columns.indexOf(dragged.parentElement.id.charAt(0));
    

    // Getting the row and column indices of the current square where the piece is being dropped
    const nextRowIndex = rows.indexOf(square.id.charAt(1));
    const nextColumnIndex = columns.indexOf(square.id.charAt(0));
    

    // Determining the color and type of the dragged piece
    const isWhite = isPieceWhite(dragged.innerText);
    const pieceType = getPieceType(dragged.innerText);
    

    // Getting all available moves for the dragged piece
    const availableMoves = getAllAvailableMoves(pieceType, prevColumnIndex, prevRowIndex, isWhite);
     

    // Setting and retrieving the validity of the move based on the piece type and move coordinates
    setValidMove(availableMoves.some(move => move.col === nextColumnIndex && move.row === nextRowIndex));
    const validMove = getValidMove();

    const test = Object.entries(Pieces);
    const firstElements = test.map(arr => arr[0]);
    console.log(firstElements);

    // Retrieving the current player's turn status
    const isWhiteTurn = getIsWhiteTurn();
    const kingColor = !isWhite ? 'white' : 'black';


    // Checking if the move is valid and it's the correct player's turn
    if (validMove && ((isWhite && isWhiteTurn) || (!isWhite && !isWhiteTurn))) {

        
        // Updating the board state and displaying the changes on the board
        updateBoardState(dragged, prevRowIndex, prevColumnIndex, nextRowIndex, nextColumnIndex);  
        updateBoardDisplay(event, square, dragged);
        
        // Setting and retrieving the king's check status after the move
        const inCheck = isInCheck(kingColor);
        setKingInCheck(inCheck);
        const kingInCheck = getKingInCheck();
        
    
        // Finding the position of the king and updating its display on the board
        const kingInCheckPosition = findPiecePosition(!isWhite ? Pieces.WHITE_KING : Pieces.BLACK_KING);
        const kingSquareId = columns[kingInCheckPosition.column] + rows[kingInCheckPosition.row];
        const kingSquare = document.getElementById(kingSquareId);
        if (kingInCheck) {
            kingSquare.classList.add("red-square");
        } else {
            kingSquare.classList.remove("red-square");
        }
        
        // Changing the player's turn
        changeTurn();
    }
} 

export default gameControl