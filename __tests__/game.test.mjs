import { Game } from "../src/scripts/game.mjs"



console.log(Game);

test('adds 1 + 2 to equal 3', () => {
    const game = new Game();
    expect(game.isOver).toBeFalsy();
  });

test('can make move', () => {
  const game = new Game();
  expect(game.makeMove('g2', 'g4')).toBeTruthy();
});