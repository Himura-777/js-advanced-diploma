import {calcTileType} from '../js/utils'

describe('calcTileType', () => {
  it('returns correct type for top-left corner', () => {
    expect(calcTileType(0)).toBe('top-left');
  });

  it('returns correct type for top-right corner', () => {
    expect(calcTileType(7)).toBe('top-right');
  });

  it('returns correct type for bottom-left corner', () => {
    expect(calcTileType(56)).toBe('bottom-left');
  });

  it('returns correct type for bottom-right corner', () => {
    expect(calcTileType(63)).toBe('bottom-right');
  });

  it('returns correct type for top edge', () => {
    expect(calcTileType(1)).toBe('top');
  });

  it('returns correct type for bottom edge', () => {
    expect(calcTileType(62)).toBe('bottom');
  });

  it('returns correct type for left edge', () => {
    expect(calcTileType(8)).toBe('left');
  });

  it('returns correct type for right edge', () => {
    expect(calcTileType(15)).toBe('right');
  });

  it('returns correct type for center', () => {
    expect(calcTileType(30)).toBe('center');
  });
});
