import { board, columns, rows, getValidMove, getIsWhiteTurn } from "./constants.js";
import { isPieceWhite } from "./utils.js"
import gameControl from "./gameControl.js";

const displayController = function() {
    const container = document.querySelector(".container")
       let dragged;
    
    function handleDrop(e, square) {
        
        const isWhiteTurn = getIsWhiteTurn();
        gameControl(dragged, square);

        const validMove = getValidMove();

        e.preventDefault();

        const isWhite = isPieceWhite(dragged.innerText);
        
        
        const attackedPiece = square.querySelector(".piece");
        if (validMove && ((isWhite && isWhiteTurn) || (!isWhite && !isWhiteTurn))) {
            // if (stillInCheck) {
            //     return
            // }
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
        //add color to square
        if ((rowIndex + columnIndex) % 2 === 0) {
            square.classList.add("black-square");
        } else {
            square.classList.add("white-square");
        }
        
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

};

export default displayController;