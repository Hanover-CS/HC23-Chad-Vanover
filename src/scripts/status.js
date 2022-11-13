import { Game } from "./game.mjs"

const $status = $('#status');
const $fen = $('#fen');
const $pgn = $('#pgn');

export function updateStatus (myGame) {

    console.log(myGame);

    let status = '';
  
    let moveColor = 'White';
    if (myGame.playerTurn === 'b') {
      moveColor = 'Black';
    };
  
    // checkmate?
    if (myGame.inCheckmate) {
      status = 'Game over, ' + moveColor + ' is in checkmate.';
    } else if (myGame.inDraw) { // draw?
      status = 'Game over, drawn position';
    } else { // game still on
      status = moveColor + ' to move';
      // check?
      if (myGame.inCheck) {
        status += ', ' + moveColor + ' is in check';
      }
    };
  
    $status.html(status);
    $fen.html(myGame.getFen);
    $pgn.html(myGame.getPgn);
  };