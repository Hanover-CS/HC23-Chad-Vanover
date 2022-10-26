// const { Chess } = require('chess.js');
import { Chess } from '../node_modules/chess.js/chess.js';
import '../node_modules/jquery/dist/jquery.js';
import '../node_modules/@chrisoakman/chessboardjs/dist/chessboard-1.0.0.js';

const game = new Chess();
let board = null;
const $status = $('#status');
const $fen = $('#fen');
const $pgn = $('#pgn');
const whiteSquareGrey = '#a9a9a9';
const blackSquareGrey = '#696969';

console.log(game);
console.log(game.game_over());
console.log(board);

function removeGreySquares () {
  $('#board .square-55d63').css('background', '');
};

function greySquare (square) {
  const $square = $('#board .square-' + square);

  let background = whiteSquareGrey;
  if ($square.hasClass('black-3c85d')) {
    background = blackSquareGrey;
  }

  $square.css('background', background);
}


function onDragStart (source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false;

  // only pick up current turn player's piece
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  };
};

function onDrop (source, target) {
  removeGreySquares();

  // see if the move is legal
  const move = game.move({
    from: source,
    to: target,
    promotion: 'q', // TODO: Currently only promotes to queen
  });

  // illegal move
  if (move === null) return 'snapback';

  updateStatus();
};

function onMouseoverSquare (square, piece) {
  // get list of possible moves for this square
  const moves = game.moves({
    square: square,
    verbose: true
  });

  // exit if there are no moves available for this square
  if (moves.length === 0) return;

  // highlight the square they moused over
  greySquare(square);

  // highlight the possible squares for this piece
  for (var i = 0; i < moves.length; i++) {
    greySquare(moves[i].to);
  }
};

function onMouseoutSquare (square, piece) {
  removeGreySquares();
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
  board.position(game.fen());
};

function updateStatus () {
  let status = '';

  let moveColor = 'White';
  if (game.turn() === 'b') {
    moveColor = 'Black';
  };

  // checkmate?
  if (game.in_checkmate()) {
    status = 'Game over, ' + moveColor + ' is in checkmate.';
  } else if (game.in_draw()) { // draw?
    status = 'Game over, drawn position';
  } else { // game still on
    status = moveColor + ' to move';
    // check?
    if (game.in_check()) {
      status += ', ' + moveColor + ' is in check';
    }
  };

  $status.html(status);
  $fen.html(game.fen());
  $pgn.html(game.pgn());
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