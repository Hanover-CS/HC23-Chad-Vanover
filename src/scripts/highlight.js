// script for handling highlights on the board

/**
 * module description
 * @module highlight
 */

/**
 * Highlights squares to represent possible moves
 * @param {String} square - The square containing a piece
 * @param {Array} moves - An array of possible moves
 */
export function highlightMoves (square, moves) {
    // exit if there are no moves available for this square
    if (moves.length === 0) return;
  
    // highlight the square they moused over
    greySquare(square);
  
    // highlight the possible squares for this piece
    for (var i = 0; i < moves.length; i++) {
      greySquare(moves[i].to);
    }
}

function greySquare (square) {
    const $square = $('#board .square-' + square);
    $square.addClass('highlight');
  };

  export function removeGreySquares () {
    $('#board .square-55d63').removeClass('highlight');
  };