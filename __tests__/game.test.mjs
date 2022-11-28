// tests for game class

import { Game } from "../src/scripts/game.mjs"

test('can create new game', () => {
    const game = new Game();
    expect(game.isOver).toBeFalsy();
  });

test('can make move', () => {
  const game = new Game();
  expect(game.makeMove('g2', 'g4')).toBeTruthy();
});

test('can get possible moves', () => {
  const game = new Game();
  expect(game.possibleMoves('e2')).toStrictEqual([
  { color: 'w', flags: 'n', from: 'e2', piece: 'p', san: 'e3', to: 'e3'}, 
  { color: 'w', flags: 'b', from: 'e2', piece: 'p', san: 'e4', to: 'e4'}
  ]);
});

test('only current player can make move', () => {
  const game = new Game();
  expect(game.makeMove('a7', 'a6')).toBeFalsy();
});

test('can castle', () => {
  const game = new Game('rnbqkbnr/1ppppppp/8/8/p5P1/7N/PPPPPPBP/RNBQK2R w KQkq - 0 4');
  expect(game.makeMove('e1', 'g1')).toBeTruthy();
});

test('cannot castle while in check', () => {
  const game = new Game('r1bqkbnr/1ppppppp/6P1/p7/8/7N/PPnPPPBP/RNBQK2R w KQkq - 0 6');
  expect(game.inCheck).toBeTruthy();
  expect(game.makeMove('e1', 'g1')).toBeFalsy();
});

test('cannot castle through line of check', () => {
  // Black bishop creates line of check on king side castle
  const game = new Game('rn1qkbnr/p2ppppp/bpp5/8/4P3/5B1N/PPPP1PPP/RNBQK2R b KQkq - 3 4');
  expect(game.makeMove('e1', 'g1')).toBeFalsy();
});

test('can en passant', () => {
  let game = new Game('rnbqkbnr/1p1p1p1p/p5p1/1Pp1pP2/8/8/P1PPP1PP/RNBQKBNR w KQkq e6 0 5');
  expect(game.makeMove('f5', 'e6')).toBeTruthy();
  // can't do previous en passant
  game = new Game('rnbqkbnr/1p1p1p1p/p5p1/1Pp1pP2/8/8/P1PPP1PP/RNBQKBNR w KQkq e6 0 5')
  expect(game.makeMove('b5', 'c6')).toBeFalsy();
});

test('can call playerTurn', () => {
  const game = new Game();
  expect(game.playerTurn).toBe('w');
});

test('can call getFen', () => {
  const game = new Game();
  expect(game.getFen).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
});

test('can call getPgn', () => {
  const game = new Game();
  game.makeMove('g2', 'g3');
  expect(game.getPgn).toBe('1. g3');
});