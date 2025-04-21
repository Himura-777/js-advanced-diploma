import Character from '../Character.js'

export default class Magician extends Character {
  constructor(level = 1) {
    super(level, 'magician');
    this.attack = 10;
    this.defence = 40;
    this.health = 50 + 30 * (level - 1);
  }
}
