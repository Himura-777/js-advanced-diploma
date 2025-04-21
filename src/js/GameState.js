export default class GameState {
  static from(object) {
    // TODO: create object
    return {
      maxScore: object?.maxScore || 0,
      currentLevel: object?.currentLevel || 1,
      theme: object?.theme || 'prairie'
    };
  }
}
