import { Pieces, columns, rows, getValidMove, setValidMove, getIsWhiteTurn, setKingInCheck, getKingInCheck  } from "./constants.js";
import { isPieceWhite, getPieceType, isValidMove, updateBoardState,  changeTurn, isInCheck, findPiecePosition, isInCheckAfterMove } from "./utils.js";


const gameControl = function (dragged, square,) {
    
    const prevRowIndex = rows.indexOf(dragged.parentElement.id.charAt(1));
    const prevColumnIndex = columns.indexOf(dragged.parentElement.id.charAt(0));
    
    const nextRowIndex = rows.indexOf(square.id.charAt(1));
    const nextColumnIndex = columns.indexOf(square.id.charAt(0));
    
    const isWhite = isPieceWhite(dragged.innerText);
    const pieceType = getPieceType(dragged.innerText);
    
    setValidMove(isValidMove(pieceType, prevColumnIndex, nextColumnIndex, prevRowIndex, nextRowIndex, isWhite ));
    const validMove = getValidMove();

    const isWhiteTurn = getIsWhiteTurn();
    const kingColor = !isWhite ? 'white' : 'black';
  
    if (validMove && ((isWhite && isWhiteTurn) || (!isWhite && !isWhiteTurn))) {
        changeTurn();
        const stillInCheck = isInCheckAfterMove(dragged,prevColumnIndex, nextColumnIndex, prevRowIndex, nextRowIndex, isWhite)

        if(stillInCheck) {
            console.log("muie micule");
            return;
        }
            updateBoardState(dragged, prevRowIndex, prevColumnIndex, nextRowIndex, nextColumnIndex);  

            setKingInCheck(isInCheck(kingColor));

            const kingInCheck = getKingInCheck();
           
            const kingInCheckPosition = findPiecePosition(!isWhite ? Pieces.WHITE_KING : Pieces.BLACK_KING);
            const kingSquareId = columns[kingInCheckPosition.column] + rows[kingInCheckPosition.row];
            const kingSquare = document.getElementById(kingSquareId);
            console.log(kingInCheck, kingColor);
            if (kingInCheck) {
                kingSquare.classList.add("red-square");
            } else {
                kingSquare.classList.remove("red-square");
            }
        }
} 

export default gameControl