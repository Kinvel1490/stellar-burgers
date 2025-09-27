import {
  expect,
  describe,
  test,
  jest,
  beforeAll,
  afterAll
} from '@jest/globals';
import {
  loginUser,
  updateUser,
  getUser,
  registerUser,
  logoutUser,
  getUserOrders
} from './actions';
import {
  loginUserApi,
  registerUserApi,
  getUserApi,
  logoutApi,
  updateUserApi
} from '@api';
import store from '../store';

const mockUserData = {
  success: true,
  accessToken: 'Bearer Fake.access.token',
  refreshToken: 'fakeRefreshToken',
  user: {
    email: 'test@mail.ru',
    name: 'Mocked User'
  }
};

const mockUserDataModified = {
  user: {
    email: 'test_modified@mail.ru',
    name: 'Mocked User modified'
  }
};

beforeAll(() => {
  (loginUserApi as jest.Mock) = jest.fn(() => Promise.resolve(mockUserData));
  (registerUserApi as jest.Mock) = jest.fn(() => Promise.resolve(mockUserData));
  (getUserApi as jest.Mock) = jest.fn(() => Promise.resolve(mockUserData));
  (updateUserApi as jest.Mock) = jest.fn(() =>
    Promise.resolve(mockUserDataModified)
  );

  jest.spyOn({ loginUserApi }, 'loginUserApi');
  jest.spyOn({ registerUserApi }, 'registerUserApi');
  jest.spyOn({ getUserApi }, 'getUserApi');
  jest.spyOn({ updateUserApi }, 'updateUserApi');
  jest.spyOn(console, 'log');
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('userSlice Test', () => {
  test('getUser test', async () => {
    expect(store.getState().user.data).toBeNull();
    await store.dispatch(getUser());
    expect(store.getState().user.data).toEqual(mockUserData.user);
  });

  test('getUser reject test', () => {
    store.dispatch({
      type: 'user/get/rejected',
      error: { message: 'Mocked error getUser' }
    });
    expect(console.log).toHaveBeenCalledWith('Mocked error getUser');
  });

  test('updateUser test', async () => {
    expect(store.getState().user.data).toEqual(mockUserData.user);
    await store.dispatch(updateUser({}));
    expect(store.getState().user.data).toEqual(mockUserDataModified.user);
  });

  test('getUser reject test', () => {
    store.dispatch({
      type: 'user/update/rejected',
      error: { message: 'Mocked error updateUser' }
    });
    expect(console.log).toHaveBeenCalledWith('Mocked error updateUser');
  });
});
