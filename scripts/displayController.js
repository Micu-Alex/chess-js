import { board, columns, rows } from "./constants.js";
import gameControl from "./gameControl.js";

const displayController = function() {
    const container = document.querySelector(".container")
       let dragged;
    
    function handleDrop(event, square) {
        gameControl(dragged, square, event);
        event.preventDefault();
        
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
        
            piece.addEventListener("dragstart", (event) => {
                dragged = event.target;
    
            });
        };
        
    
        square.addEventListener("dragover", (event) => {
            event.preventDefault();
            false;
        });

        square.addEventListener("drop", (event) => {
            handleDrop(event, square);
        });
        
        const marking = document.createElement("p");
        marking.classList.add("marking");
        marking.innerHTML = square.id;
        square.appendChild(marking);

        container.appendChild(square);
    }));

};

export default displayController;