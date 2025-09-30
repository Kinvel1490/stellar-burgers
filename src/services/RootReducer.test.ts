import {
  expect,
  describe,
  test,
  jest,
  beforeAll,
  afterAll
} from '@jest/globals';
import RootReducer from './RootReducer';

describe('RootReducer test', () => {
  test('Root reducer initialize test', () => {
    const action = { type: 'SOME_ACTION' };
    const state = RootReducer(undefined, action);
    expect(state).toBeDefined();
    expect(state.order).toBeDefined();
    expect(state.ingredients).toBeDefined();
    expect(state.feeds).toBeDefined();
    expect(state.user).toBeDefined();
  });
});
