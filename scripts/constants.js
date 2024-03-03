export const  Pieces  = {
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

export const board = [
    [Pieces.BLACK_ROOK, Pieces.BLACK_KNIGHT, Pieces.BLACK_BISHOP, Pieces.BLACK_QUEEN, Pieces.BLACK_KING, Pieces.BLACK_BISHOP, Pieces.BLACK_KNIGHT, Pieces.BLACK_ROOK], 
    [Pieces.BLACK_PAWN,Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN, Pieces.BLACK_PAWN,Pieces. BLACK_PAWN, Pieces.BLACK_PAWN],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    [Pieces.WHITE_PAWN,Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN, Pieces.WHITE_PAWN,Pieces. WHITE_PAWN, Pieces.WHITE_PAWN],
    [Pieces.WHITE_ROOK, Pieces.WHITE_KNIGHT, Pieces.WHITE_BISHOP, Pieces.WHITE_QUEEN, Pieces.WHITE_KING, Pieces.WHITE_BISHOP, Pieces.WHITE_KNIGHT, Pieces.WHITE_ROOK], 
];
 export const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
 export const rows = ["8", "7", "6", "5", "4", "3", "2", "1" ];


const gameData = {
    validMove: false,
    isWhiteTurn: true,
    kingInCheck: false,
};

export const getValidMove = () => gameData.validMove;
export const setValidMove = (value) => gameData.validMove = value;

export const getIsWhiteTurn = () => gameData.isWhiteTurn;
export const setIsWhiteTurn = (value) => gameData.isWhiteTurn = value;

export const getKingInCheck = () => gameData.kingInCheck;
export const setKingInCheck = (value) => gameData.kingInCheck = value;
