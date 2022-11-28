// Game class handles the logic of game state

import { Chess } from '../../node_modules/chess.js/chess.js';

export class Game {
    constructor(fen){
        this.game = new Chess(fen);
    }

    get isOver() {
        return this.game.game_over();
    }

    get playerTurn() {
        return this.game.turn();
    }

    get getFen() {
        return this.game.fen();
    }

    get getPgn() {
        return this.game.pgn();
    }

    get inCheckmate() {
        return this.game.in_checkmate();
    }

    get inCheck() {
        return this.game.in_check();
    }

    get inDraw() {
        return this.game.in_draw();
    }
   
    makeMove(source, target) {
        const move = this.game.move({
            from: source,
            to: target,
            promotion: 'q' // TODO
        });
        return move != null;
    }

    possibleMoves(square) {
        return this.game.moves({
            square: square,
            verbose: true
        });
    }
}