// Updates the status line for the ui

/**
 * Handles the status strings displayed in the window
 * @module status
 */

/**
 * @constant
 * @type {jQuery}
 * @default
 */
const $status = $('#status')
/**
 * @constant
 * @type {jQuery}
 * @default
 */
const $fen = $('#fen')
/**
 * @constant
 * @type {jQuery}
 * @default
 */
const $pgn = $('#pgn')

/**
 * Updates the status strings to the ui
 * @param {Game} myGame - A Game object
 */
export function updateStatus (myGame) {
  console.log(myGame)

  let status = ''

  let moveColor = 'White'
  if (myGame.playerTurn === 'b') {
    moveColor = 'Black'
  }

  // checkmate?
  if (myGame.inCheckmate) {
    status = 'Game over, ' + moveColor + ' is in checkmate.'
  } else if (myGame.inDraw) {
    // draw?
    status = 'Game over, drawn position'
  } else {
    // game still on
    status = moveColor + ' to move'
    // check?
    if (myGame.inCheck) {
      status += ', ' + moveColor + ' is in check'
    }
  }

  $status.html(status)
  $fen.html(myGame.getFen)
  $pgn.html(myGame.getPgn)
}
