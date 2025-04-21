import GameState from './GameState.js'

export default class GameStateService {
  constructor(storage) {
    this.storage = storage;
  }

  save(state) {
    const serializedState = {
      ...state,
      positionedCharacters: state.positionedCharacters.map(pc => ({
        character: {
          ...pc.character,
          __proto__: Object.getPrototypeOf(pc.character),
        },
        position: pc.position,
      })),
    };
    this.storage.setItem('state', JSON.stringify(serializedState));
  }

  load() {
    try {
      const data = this.storage.getItem('state');
      if (!data) return null;

      const parsed = JSON.parse(data);
      return GameState.from(parsed);
    } catch (e) {
      throw new Error('Invalid state');
    }
  }
}
