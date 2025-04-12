import themes from './themes.js'
import {generateTeam} from './generators.js'
import Bowman from './characters/Bowman.js'
import Swordsman from './characters/Swordsman.js'
import Magician from './characters/Magician.js'
import Vampire from './characters/Vampire.js'
import Undead from './characters/Undead.js'
import Daemon from './characters/Daemon.js'
import PositionedCharacter from './PositionedCharacter.js'
import cursors from './cursors.js'

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.playerTeam = null;
    this.enemyTeam = null;
    this.positionedCharacters = [];
    this.selectedCharacter = null;
  }

  init() {
    this.gamePlay.drawUi(themes.prairie);
    // TODO: add event listeners to gamePlay events
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));

    // TODO: load saved stated from stateService
    const playerTypes = [Bowman, Swordsman, Magician];
    const enemyTypes = [Vampire, Undead, Daemon];

    this.playerTeam = generateTeam(playerTypes, 3, 2);
    this.enemyTeam = generateTeam(enemyTypes, 3, 2);

    const playerPositions = [0, 1, 8, 9];
    const enemyPositions = [6, 7, 14, 15];

    const positionedCharacters = [];

    this.playerTeam.characters.forEach((character, index) => {
      positionedCharacters.push(new PositionedCharacter(character, playerPositions[index]));
    });

    this.enemyTeam.characters.forEach((character, index) => {
      positionedCharacters.push(new PositionedCharacter(character, enemyPositions[index]));
    });

    this.gamePlay.redrawPositions(positionedCharacters);
  }

  getCharacterInfo(character) {
    return `🎖${character.level} ⚔${character.attack} 🛡${character.defence} ❤${character.health}`;
  }

  getMoveRange(character) {
    switch(character.type) {
      case 'swordsman':
      case 'undead':
        return 4;
      case 'bowman':
      case 'vampire':
        return 2;
      case 'magician':
      case 'daemon':
        return 1;
      default:
        return 0;
    }
  }

  getAttackRange(character) {
    switch(character.type) {
      case 'swordsman':
      case 'undead':
        return 1;
      case 'bowman':
      case 'vampire':
        return 2;
      case 'magician':
      case 'daemon':
        return 4;
      default:
        return 0;
    }
  }

  getDistance(pos1, pos2) {
    const x1 = pos1 % 8;
    const y1 = Math.floor(pos1 / 8);
    const x2 = pos2 % 8;
    const y2 = Math.floor(pos2 / 8);
    return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
  }

  onCellClick(index) {
    // TODO: react to click
    const positionedCharacter = this.positionedCharacters.find(pc => pc.position === index);

    if (positionedCharacter && this.isPlayerCharacter(positionedCharacter.character)) {
      this.selectedCharacter = positionedCharacter;
      this.gamePlay.selectCell(index, 'yellow');
      return;
    }

    if (this.selectedCharacter) {
      const distance = this.getDistance(this.selectedCharacter.position, index);

      if (distance <= this.getMoveRange(this.selectedCharacter.character)) {
      } else if (this.canAttack(this.selectedCharacter, index)) {
      } else {
        this.gamePlay.showError('Недопустимое действие');
      }
    }
  }

  canAttack(selectedChar, cellIndex) {
    const target = this.positionedCharacters.find(pc => pc.position === cellIndex);
    if (!target || this.isPlayerCharacter(target.character)) return false;

    const distance = this.getDistance(selectedChar.position, cellIndex);
    return distance <= this.getAttackRange(selectedChar.character);
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    const positionedCharacter = this.positionedCharacters.find(pc => pc.position === index);

    if (positionedCharacter) {
      const message = this.getCharacterInfo(positionedCharacter.character);
      this.gamePlay.showCellTooltip(message, index);
    }

    if (this.selectedCharacter) {
      const distance = this.getDistance(this.selectedCharacter.position, index);
      const moveRange = this.getMoveRange(this.selectedCharacter.character);

      if (!positionedCharacter && distance <= moveRange) {
        this.gamePlay.selectCell(index, 'green');
        this.gamePlay.setCursor(cursors.pointer);
      }
      else if (this.canAttack(this.selectedCharacter, index)) {
        this.gamePlay.selectCell(index, 'red');
        this.gamePlay.setCursor(cursors.crosshair);
      }
      else {
        this.gamePlay.setCursor(cursors.notallowed);
      }
    }
    else if (positionedCharacter && this.isPlayerCharacter(positionedCharacter.character)) {
      this.gamePlay.setCursor(cursors.pointer);
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.hideCellTooltip(index);
    this.gamePlay.deselectCell(index);
    this.gamePlay.setCursor(cursors.auto);
  }

  isPlayerCharacter(character) {
    const playerTypes = ['bowman', 'swordsman', 'magician'];
    return playerTypes.includes(character.type);
  }
}

