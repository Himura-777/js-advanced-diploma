import Character from '../Character.js'

export default class Bowman extends Character {
  constructor(level = 1) {
    super(level, 'bowman');
    this.attack = 25;
    this.defence = 25;
    this.health = 50 + 30 * (level - 1);
  }
}
