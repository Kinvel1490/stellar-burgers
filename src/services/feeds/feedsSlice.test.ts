import { expect, describe, test } from '@jest/globals';
import { getFeeds } from './actions';
import feedSlice from './feedsSlice';

const mockFeeds = {
  success: true,
  orders: [
    {
      _id: '68d76808673086001ba8a234',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0942'
      ],
      status: 'done',
      name: 'Краторный spicy био-марсианский бургер',
      createdAt: '2025-09-27T04:28:56.679Z',
      updatedAt: '2025-09-27T04:28:57.918Z',
      number: 89759
    },
    {
      _id: '68d76773673086001ba8a233',
      ingredients: ['643d69a5c3f7b9001cfa0940', '643d69a5c3f7b9001cfa093f'],
      status: 'done',
      name: 'Бессмертный метеоритный бургер',
      createdAt: '2025-09-27T04:26:27.203Z',
      updatedAt: '2025-09-27T04:26:28.680Z',
      number: 89758
    },
    {
      _id: '68d7612d673086001ba8a22b',
      ingredients: [
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный бессмертный spicy бургер',
      createdAt: '2025-09-27T03:59:41.643Z',
      updatedAt: '2025-09-27T03:59:42.911Z',
      number: 89757
    },
    {
      _id: '68d74e4c673086001ba8a21d',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный астероидный экзо-плантаго био-марсианский метеоритный бургер',
      createdAt: '2025-09-27T02:39:08.078Z',
      updatedAt: '2025-09-27T02:39:09.219Z',
      number: 89756
    }
  ],
  total: 4,
  totalToday: 2
};

describe('Feeds tests', () => {
  test('getFeeds test', () => {
    const state = feedSlice(undefined, {
      type: 'feeds/get/fulfilled',
      payload: mockFeeds
    });
    expect(state.feeds.isLoading).toBe(false);
    expect(state.feeds.orders).toEqual(mockFeeds.orders);
    expect(state.feeds.total).toEqual(4);
    expect(state.feeds.totalToday).toEqual(2);
    expect(state.feeds.error).toBe(null);
  });

  test('getFeeds test (failure)', () => {
    const state = feedSlice(undefined, {
      type: 'feeds/get/rejected',
      error: { message: 'Mock message' }
    });
    expect(state.feeds.error).toBe('Mock message');
  });
});
