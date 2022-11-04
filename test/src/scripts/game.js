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
}