import { board, columns, rows } from "./constants.js";
import gameControl from "./gameControl.js";
import {getIsWhiteTurn} from "./gameData.js"


const displayController = (function() {

    const container = document.querySelector(".container")
    const turnDisplay = document.querySelector(".turnDisplay")
    let dragged;
    turnDisplay.textContent = `Is white turn.`
    
    // Function to handle the drop event
    function handleDrop(event, square) {
        gameControl(dragged, square, event);
        event.preventDefault();
        const isWhiteTurn = getIsWhiteTurn()

        const player = isWhiteTurn ? "white" : "black"

        turnDisplay.textContent = `Is ${player} turn.`

        console.log(board);
    }
    
    // Looping through each row and column to create squares
    board.forEach((row, rowIndex) => row.forEach((_, columnIndex)=> {

        const square = document.createElement("div");
        
        square.classList.add("square");

        // Generating a unique ID for each square based on its position
        const squareIndex = columns[columnIndex] + rows[rowIndex];
        square.id = squareIndex;

        // Adding color to the square based on its position
        if ((rowIndex + columnIndex) % 2 === 0) {
            square.classList.add("black-square");
        } else {
            square.classList.add("white-square");
        }
        
        // Checking if there is a piece in the current board position
        if (board[rowIndex][columnIndex] !== "") {
            // Creating a piece element
            const piece = document.createElement("div")  ;
            piece.classList.add("piece");
            piece.draggable = true;
            piece.innerHTML = board[rowIndex][columnIndex];
            square.appendChild(piece);
            // Adding a dragstart event listener to the piece
            piece.addEventListener("dragstart", (event) => {
                dragged = event.target;
    
            });
        };
        
        // Adding dragover event listener to the square
        square.addEventListener("dragover", (event) => {
            // Preventing the default dragover behavior
            event.preventDefault();
        });

        // Adding drop event listener to the square
        square.addEventListener("drop", (event) => {
            handleDrop(event, square);
        });
        
        // Creating a marking element to display the square's ID
        const marking = document.createElement("p");
        marking.classList.add("marking");
        marking.innerHTML = square.id;
        square.appendChild(marking);

        // Appending the square to the container
        container.appendChild(square);
    }));

})();

export default displayController;