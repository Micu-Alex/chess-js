// Storing game-related data in an object
const gameData = {
    validMove: false,
    isWhiteTurn: true,
    kingInCheck: false,
};
// Getter and setter functions for game data

export const getValidMove = () => gameData.validMove;
export const setValidMove = (value) => gameData.validMove = value;

export const getIsWhiteTurn = () => gameData.isWhiteTurn;
export const setIsWhiteTurn = (value) => gameData.isWhiteTurn = value;

export const getKingInCheck = () => gameData.kingInCheck;
export const setKingInCheck = (value) => gameData.kingInCheck = value;
