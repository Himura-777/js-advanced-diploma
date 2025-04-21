/**
 * Базовый класс, от которого наследуются классы персонажей
 * @property level - уровень персонажа, от 1 до 4
 * @property attack - показатель атаки
 * @property defence - показатель защиты
 * @property health - здоровье персонажа
 * @property type - строка с одним из допустимых значений:
 * swordsman
 * bowman
 * magician
 * daemon
 * undead
 * vampire
 */
export default class Character {
  constructor(level, type = 'generic') {
    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 50;
    this.type = type;
    
    // TODO: выбросите исключение, если кто-то использует "new Character()"
    if (new.target === Character) {
      throw new Error('Cannot instantiate Character directly');
    }

    for (let i = 1; i < level; i++) {
      this.levelUp();
    }
  }

  levelUp() {
    this.level += 1;
    const newHealth = this.level + 80;
    this.health = Math.min(newHealth, 100);

    const improvementFactor = (80 + this.health) / 100;
    this.attack = Math.max(this.attack, Math.round(this.attack * improvementFactor));
    this.defence = Math.max(this.defence, Math.round(this.defence * improvementFactor));
  }
}
