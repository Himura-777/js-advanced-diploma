import GameController from '../js/GameController.js'
import Bowman from '../js/characters/Bowman.js'

describe('Tooltip functionality', () => {
  let gameController;
  let mockGamePlay;
  let mockStateService;

  beforeEach(() => {
    mockGamePlay = {
      showCellTooltip: jest.fn(),
      hideCellTooltip: jest.fn(),
      addCellEnterListener: jest.fn(),
      addCellLeaveListener: jest.fn(),
      drawUi: jest.fn()
    };
    mockStateService = {};
    gameController = new GameController(mockGamePlay, mockStateService);
  });

  test('getCharacterInfo returns correct format', () => {
    const bowman = new Bowman(2);
    bowman.health = 75;
    const expected = '🎖2 ⚔25 🛡25 ❤75';
    expect(gameController.getCharacterInfo(bowman)).toBe(expected);
  });

  test('onCellEnter shows tooltip when character exists', () => {
    const bowman = new Bowman(1);
    gameController.positionedCharacters = [{ character: bowman, position: 5 }];

    gameController.onCellEnter(5);
    expect(mockGamePlay.showCellTooltip).toHaveBeenCalledWith('🎖1 ⚔25 🛡25 ❤50', 5);
  });

  test('onCellEnter does nothing when no character', () => {
    gameController.onCellEnter(5);
    expect(mockGamePlay.showCellTooltip).not.toHaveBeenCalled();
  });

  test('onCellLeave hides tooltip', () => {
    gameController.onCellLeave(5);
    expect(mockGamePlay.hideCellTooltip).toHaveBeenCalledWith(5);
  });
});
