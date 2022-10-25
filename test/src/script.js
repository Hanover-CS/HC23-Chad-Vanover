const { Chess } = require('chess.js');

const chess = new Chess();
console.log(chess);
console.log(chess.game_over);

while (!chess.isGameOver()) {
    const moves = chess.moves();
    const move = moves[Math.floor(Math.random() * moves.length)];
    chess.move(move);
};

console.log(chess.pgn());
console.log("Hello, world!");