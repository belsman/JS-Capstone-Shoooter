import state from '../src/state';

describe('Test the game state module', () => {
  it('should have two keys', () => {
    expect(Object.keys(state).length).toBe(2);
  });

  it('should have a user key as null', () => {
    expect(state.user).toBe(null);
  });

  it('should have a score key as null', () => {
    expect(state.score).toBe(null);
  });
});