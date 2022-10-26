// const { Chess } = require('chess.js');
import { Chess } from '../node_modules/chess.js/chess.js';
import '../node_modules/jquery/dist/jquery.js';
import '../node_modules/@chrisoakman/chessboardjs/dist/chessboard-1.0.0.js';

const chess = new Chess();
console.log(chess);
console.log(chess.game_over);

const game = new Chess();

let board = null;

function makeRandomMove () {
  const possibleMoves = game.moves();

  // exit if the game is over
  if (game.game_over()) return;

  const randomIdx = Math.floor(Math.random() * possibleMoves.length);
  game.move(possibleMoves[randomIdx]);
  board.position(game.fen());

  window.setTimeout(makeRandomMove, 500);
}

const config = {
  position: 'start',
  pieceTheme: 'img/{piece}.png'
};

board = new Chessboard('board', config);
console.log(board);

window.setTimeout(makeRandomMove, 500);



console.log(chess.pgn());
console.log("Hello, world!");