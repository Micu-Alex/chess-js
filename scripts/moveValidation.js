import { board } from "./constants.js";

export const isValidPownMove = function (prevCol, nextCol, prevRow, nextRow, isWhite) {
    const direction = isWhite ? -1 : 1
 
    // Moving forward one square
    if (prevCol === nextCol && board[nextRow][nextCol] === "")  {
        if (nextRow === prevRow + direction) {
            return true;
        };

    // Moving forward two squares from starting position
    if ((isWhite ? 6 : 1) === prevRow && nextRow === prevRow + 2 * direction  && board[prevRow + direction][prevCol] === "" && board[nextRow][nextCol] === "") {
        return true;
       };
    };

    // Capturing diagonally
    if (Math.abs(nextCol- prevCol) === 1 && nextRow === prevRow + direction && board[nextRow][nextCol] !== "") {
        return true;
    };

    return false;
};

export const isValidRookMove = function (prevCol, nextCol, prevRow, nextRow) {
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

export const isValidKnightMove = function(prevCol, nextCol, prevRow, nextRow) {
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


export const isValidBishopMove = function(prevCol, nextCol, prevRow, nextRow) {
    
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


export const isValidQueenMove = function(prevCol, nextCol, prevRow, nextRow) {
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

export const isValidKingMove = function(prevCol, nextCol, prevRow, nextRow) {
    if (Math.abs(nextRow - prevRow) <= 1 && Math.abs(nextCol - prevCol) <= 1 ) {
         return true
    };
    return false
 }