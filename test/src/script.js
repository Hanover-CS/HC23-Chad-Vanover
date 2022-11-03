import '../node_modules/jquery/dist/jquery.js';
import '../node_modules/@chrisoakman/chessboardjs/dist/chessboard-1.0.0.js';
import { highlightMoves } from './scripts/highlight.js';
import { Game } from './scripts/game.js';

const myGame = new Game();
let board = null;
const $status = $('#status');
const $fen = $('#fen');
const $pgn = $('#pgn');

console.log(myGame.game);
console.log(myGame.game.game_over());
console.log(board);

function removeGreySquares () {
  $('#board .square-55d63').css('background', '');
};

function onDragStart (source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (myGame.game.game_over()) return false;

  // only pick up current turn player's piece
  if ((myGame.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (myGame.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  };
};

function onDrop (source, target) {
  removeGreySquares();

  // see if the move is legal
  const move = myGame.game.move({
    from: source,
    to: target,
    promotion: 'q', // TODO: Currently only promotes to queen ; dialogue html
  });

  // illegal move
  if (move === null) return 'snapback';

  updateStatus();
};

function onMouseoverSquare (square, piece) {
  // get list of possible moves for this square
  const moves = myGame.game.moves({
    square: square,
    verbose: true
  });
  highlightMoves(square, moves); 
};

function onMouseoutSquare (square, piece) {
  removeGreySquares();
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
  board.position(myGame.game.fen());
};

function updateStatus () {
  let status = '';

  let moveColor = 'White';
  if (myGame.game.turn() === 'b') {
    moveColor = 'Black';
  };

  // checkmate?
  if (myGame.game.in_checkmate()) {
    status = 'Game over, ' + moveColor + ' is in checkmate.';
  } else if (myGame.game.in_draw()) { // draw?
    status = 'Game over, drawn position';
  } else { // game still on
    status = moveColor + ' to move';
    // check?
    if (myGame.game.in_check()) {
      status += ', ' + moveColor + ' is in check';
    }
  };

  $status.html(status);
  $fen.html(myGame.game.fen());
  $pgn.html(myGame.game.pgn());
}


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

updateStatus();

$('#startBtn').on('click', board.start);
$('#clearBtn').on('click', board.clear);



console.log("Hello, world!");

