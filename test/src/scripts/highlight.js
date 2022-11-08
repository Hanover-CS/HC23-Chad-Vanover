const whiteSquareGrey = '#a9a9a9';
const blackSquareGrey = '#696969';

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
  
    let background = whiteSquareGrey;
    if ($square.hasClass('black-3c85d')) {
      background = blackSquareGrey;
    }
  
    $square.css('background', background);
  };

  export function removeGreySquares () {
    $('#board .square-55d63').css('background', '');
  };