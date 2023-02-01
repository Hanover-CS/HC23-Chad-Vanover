// Game class handles the logic of game state

import { Chess } from '../../node_modules/chess.js/chess.js';

/**
 * The Game class
 */
export class Game {
  /**
   * Constructor for the Game class
   * @param {String} fen - A string for a board position
   */
  constructor (fen) {
    this.game = new Chess(fen);
  }

  /**
   * Returns true if game is over, false otherwise
   */
  get isOver () {
    return this.game.game_over();
  }

  /**
   * Returns 'w' if it's white's turn, 'b' otherwise
   */
  get playerTurn () {
    return this.game.turn();
  }

  /**
   * Returns fen string of current board position
   */
  get getFen () {
    return this.game.fen();
  }

  /**
   * Returns portable game notation of current game state
   */
  get getPgn () {
    return this.game.pgn();
  }

  /**
   * Returns true if game has ended in checkmate, false otherwise
   */
  get inCheckmate () {
    return this.game.in_checkmate();
  }

  /**
   * Returns true if game is in check state, false otherwise
   */
  get inCheck () {
    return this.game.in_check();
  }

  /**
   * Returns true if game has ended in draw, false otherwise
   */
  get inDraw () {
    return this.game.in_draw();
  }

  /**
   * Executes a piece's move
   * @param {String} source - An html string for the square containing the piece attempting to move
   * @param {String} target - An html string for the square a piece is trying to move to
   */
  makeMove (source, target) {
    const move = this.game.move({
      from: source,
      to: target,
      promotion: 'q' // TODO
    });
    return move != null;
  }

  /**
   * Returns an array of possible moves for the piece on a given square
   * @param {String} square - An html string for a square on a chessboard
   */
  possibleMoves (square) {
    return this.game.moves({
      square,
      verbose: true
    });
  }
}
