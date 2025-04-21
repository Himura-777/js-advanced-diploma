import Character from '../Character.js'

export default class Daemon extends Character {
  constructor(level = 1) {
    super(level, 'daemon');
    this.attack = 10;
    this.defence = 10;
    this.health = 50 + 30 * (level - 1);
  }
}

