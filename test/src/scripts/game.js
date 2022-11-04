import { Chess } from '../../node_modules/chess.js/chess.js';

export class Game {
    constructor(){
        this.game = new Chess();
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
   
    makeMove(source, target) {
        return this.game.move({
            from: source,
            to: target,
            promotion: 'p' // TODO
        });
    }

    possibleMoves(square) {
        return this.game.moves({
            square: square,
            verbose: true
        });
    }
}