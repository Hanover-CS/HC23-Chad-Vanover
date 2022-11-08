import '../node_modules/jquery/dist/jquery.js';
import '../node_modules/@chrisoakman/chessboardjs/dist/chessboard-1.0.0.js';
import { highlightMoves } from './scripts/highlight.js';
import { Game } from './scripts/game.js';
import { updateStatus } from './scripts/status.js';
import { removeGreySquares } from './scripts/highlight.js';

const myGame = new Game();
let board = null;

console.log(myGame);
console.log(myGame.isOver);
console.log(board);



function onDragStart (source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (myGame.isOver) return false;

  // only pick up current turn player's piece
  if ((myGame.playerTurn === 'w' && piece.search(/^b/) !== -1) ||
      (myGame.playerTurn === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  };
};

function onDrop (source, target) {
  removeGreySquares();

  // see if the move is legal
  const move = myGame.makeMove(source, target);

  // illegal move
  if (move === null) return 'snapback';

  updateStatus(myGame);
};

function onMouseoverSquare (square, piece) {
  // get list of possible moves for this square
  const moves = myGame.possibleMoves(square);
  highlightMoves(square, moves); 
};

function onMouseoutSquare (square, piece) {
  removeGreySquares();
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
  board.position(myGame.getFen);
};




const config = {
  draggable: true,
  position: 'start',
  pieceTheme: 'img/{piece}.png',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare,
  onSnapEnd: onSnapEnd,
};

board = Chessboard('board', config);
console.log(board);
console.log(myGame);


updateStatus(myGame);

$('#startBtn').on('click', board.start);
$('#clearBtn').on('click', board.clear);



console.log("Hello, world!");

