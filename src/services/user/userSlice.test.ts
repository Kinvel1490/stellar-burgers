import {
  expect,
  describe,
  test,
  jest,
  beforeAll,
  afterAll
} from '@jest/globals';
import userSlice, { TUserData } from './userSlice';
import { configureStore } from '@reduxjs/toolkit';

const mockUserData = {
  success: true,
  user: {
    email: 'test@mail.ru',
    name: 'Mocked User'
  }
};

const initialState: TUserData = {
  data: null,
  orders: []
};

const mockUserDataModified = {
  email: 'test_modified@mail.ru',
  name: 'Mocked User modified'
};

const mockOrders = [
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
];

beforeAll(() => {
  jest.spyOn(console, 'log');
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('userSlice Test', () => {
  test('getUser test', () => {
    const state = userSlice(initialState, {
      type: 'user/get/fulfilled',
      payload: mockUserData
    });
    expect(state.data).toEqual(mockUserData.user);
  });

  test('getUser reject test', () => {
    userSlice(initialState, {
      type: 'user/get/rejected',
      error: {
        message: 'Mocked error getUser'
      }
    });
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('Mocked error getUser');
  });

  test('updateUser test', () => {
    const store = configureStore({
      preloadedState: {
        data: mockUserData.user,
        orders: []
      },
      reducer: userSlice
    });
    store.dispatch({
      type: 'user/update/fulfilled',
      payload: { user: mockUserDataModified }
    });
    expect(store.getState().data).toEqual(mockUserDataModified);
  });

  test('updateUser test failure', () => {
    userSlice(initialState, {
      type: 'user/update/rejected',
      error: {
        message: 'Mocked error updateUser'
      }
    });
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('Mocked error updateUser');
  });

  test('user logOut test', () => {
    const store = configureStore({
      preloadedState: {
        data: mockUserData.user,
        orders: []
      },
      reducer: userSlice
    });
    store.dispatch({
      type: 'user/logout/fulfilled',
      payload: {
        success: true
      }
    });
    expect(store.getState().data).toBeNull();
  });

  test('getUserOrders test success', () => {
    const store = configureStore({
      preloadedState: {
        data: null,
        orders: []
      },
      reducer: userSlice
    });
    store.dispatch({
      type: 'user/get_orders/fulfilled',
      payload: mockOrders
    });
    expect(store.getState().orders).toEqual(mockOrders);
  });

  test('getUserOrders reject test', () => {
    userSlice(initialState, {
      type: 'user/get_orders/rejected',
      error: {
        message: 'Mocked error getUserOrders'
      }
    });
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('Mocked error getUserOrders');
  });

  test('registerUser test success', () => {
    const state = userSlice(undefined, {
      type: 'user/register/fulfilled',
      payload: mockUserData
    });
    expect(state.data).toEqual(mockUserData.user);
  });

  test('registerUser test failure', () => {
    userSlice(undefined, {
      type: 'user/register/rejected',
      error: { message: 'Mocked error registerUser' }
    });
  });

  test('loginUser test success', () => {
    const state = userSlice(undefined, {
      type: 'user/login/fulfilled',
      payload: mockUserData
    });
    expect(state.data).toEqual(mockUserData.user);
  });

  test('loginUser test failure', () => {
    userSlice(undefined, {
      type: 'user/login/rejected',
      error: { message: 'Mocked error loginUser' }
    });
  });
});
