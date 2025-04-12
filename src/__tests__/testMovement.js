import GameController from '../js/GameController.js'
import Bowman from '../js/characters/Bowman.js'
import Swordsman from '../js/characters/Swordsman.js'
import Magician from '../js/characters/Magician.js'
import Vampire from '../js/characters/Vampire.js'

describe('Movement and attack ranges', () => {
  let gameController;

  beforeEach(() => {
    gameController = new GameController({}, {});
  });

  test('Bowman has correct ranges', () => {
    const bowman = new Bowman(1);
    expect(gameController.getMoveRange(bowman)).toBe(2);
    expect(gameController.getAttackRange(bowman)).toBe(2);
  });

  test('Swordsman has correct ranges', () => {
    const swordsman = new Swordsman(1);
    expect(gameController.getMoveRange(swordsman)).toBe(4);
    expect(gameController.getAttackRange(swordsman)).toBe(1);
  });

  test('Magician has correct ranges', () => {
    const magician = new Magician(1);
    expect(gameController.getMoveRange(magician)).toBe(1);
    expect(gameController.getAttackRange(magician)).toBe(4);
  });

  test('Vampire has correct ranges', () => {
    const vampire = new Vampire(1);
    expect(gameController.getMoveRange(vampire)).toBe(2);
    expect(gameController.getAttackRange(vampire)).toBe(2);
  });

  test('Distance calculation works', () => {
    expect(gameController.getDistance(0, 0)).toBe(0); // та же клетка
    expect(gameController.getDistance(0, 1)).toBe(1); // рядом по горизонтали
    expect(gameController.getDistance(0, 8)).toBe(1); // рядом по вертикали
    expect(gameController.getDistance(0, 9)).toBe(1); // по диагонали
    expect(gameController.getDistance(0, 18)).toBe(2); // две клетки по диагонали
  });
});
