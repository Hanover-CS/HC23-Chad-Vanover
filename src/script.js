// "main" script; passes functions to chessboard config
/* global Chessboard */

import '../node_modules/jquery/dist/jquery.js'
import '../node_modules/@chrisoakman/chessboardjs/dist/chessboard-1.0.0.js'
import { highlightMoves, removeGreySquares } from './scripts/highlight.js'
import { Game } from './scripts/game.mjs'
import { updateStatus } from './scripts/status.js'

const myGame = new Game()
let board = null

console.log(myGame)
console.log(myGame.isOver)
console.log(board)

function onDragStart (piece) {
  // do not pick up pieces if the game is over
  if (myGame.isOver) return false

  // only pick up current turn player's piece
  if (
    (myGame.playerTurn === 'w' && piece.search(/^b/) !== -1) ||
    (myGame.playerTurn === 'b' && piece.search(/^w/) !== -1)
  ) {
    return false
  }
}

function onDrop (source, target) {
  removeGreySquares()
  console.log(source, target)

  // see if the move is legal
  const move = myGame.makeMove(source, target)

  // illegal move
  if (!move) return 'snapback'

  updateStatus(myGame)
}

function onMouseoverSquare (square, piece) {
  // get list of possible moves for this square
  const moves = myGame.possibleMoves(square)
  highlightMoves(square, moves)
}

function onMouseoutSquare (square, piece) {
  removeGreySquares()
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
  board.position(myGame.getFen)
}

const config = {
  draggable: true,
  position: 'start',
  pieceTheme: 'img/{piece}.png',
  onDragStart: (source, piece, position, orientation) => onDragStart(piece),
  onDrop,
  onMouseoutSquare,
  onMouseoverSquare,
  onSnapEnd
}

board = Chessboard('board', config)
console.log(board)
console.log(myGame)

updateStatus(myGame)

console.log('Hello, world!')
