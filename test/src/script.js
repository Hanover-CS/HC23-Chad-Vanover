// const { Chess } = require('chess.js');
import { Chess } from '../node_modules/chess.js/chess.js';
import '../node_modules/jquery/dist/jquery.js';
import '../node_modules/@chrisoakman/chessboardjs/dist/chessboard-1.0.0.js';

const config = {
    position: 'start',
    pieceTheme: 'img/{piece}.png'
  };

const board = new Chessboard('board1', config);

const chess = new Chess();
console.log(chess);
console.log(chess.game_over);

while (!chess.game_over) {
    const moves = chess.moves();
    const move = moves[Math.floor(Math.random() * moves.length)];
    chess.move(move);
};

console.log(chess.pgn());
console.log("Hello, world!");