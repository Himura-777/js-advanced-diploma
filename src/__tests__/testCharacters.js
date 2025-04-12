import Character from '../js/Character.js'
import Bowman from '../js/characters/Bowman.js'

test('should throw error when creating Character directly', () => {
  expect(() => new Character(1)).toThrow('Cannot instantiate Character directly');
});

test('should allow creating child classes', () => {
  expect(() => new Bowman(1)).not.toThrow();
});

test('Bowman should have correct stats', () => {
  const bowman = new Bowman(1);
  expect(bowman.type).toBe('bowman');
  expect(bowman.attack).toBe(25);
  expect(bowman.defence).toBe(25);
});
