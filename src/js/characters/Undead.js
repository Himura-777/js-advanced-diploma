import Character from '../Character.js'

export default class Undead extends Character {
  constructor(level = 1) {
    super(level, 'undead');
    this.attack = 40;
    this.defence = 10;
    this.health = 50 + 30 * (level - 1);
  }
}
