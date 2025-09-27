import {
  expect,
  describe,
  test,
  jest,
  beforeAll,
  afterAll
} from '@jest/globals';
import RootReducer from '../RootReducer';
import {
  addIngredient,
  removeIngredient,
  TOrderSlice,
  moveIngredientDown,
  moveIngredientUp
} from './orderSlice';
import { getOrderByNumberApi } from '@api';
import store from '../store';
import { getOrderByNumber } from './actions';

jest.mock('@api');

beforeAll(() => {
  (getOrderByNumberApi as jest.Mock) = jest.fn(() =>
    Promise.resolve({
      orders: [ingredient]
    })
  );

  jest.spyOn({ getOrderByNumberApi }, 'getOrderByNumberApi');
  jest.spyOn(console, 'log');
});

afterAll(() => {
  jest.clearAllMocks();
});

const ingredient = {
  _id: '643d69a5c3f7b9001cfa0943',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
  id: '3',
  __v: 0
};

const preloadedState: TOrderSlice = {
  orderRequestItems: {
    bun: {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: '1'
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        id: '2'
      },
      {
        _id: '643d69a5c3f7b9001cfa0943',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
        id: '3'
      }
    ]
  },
  orderRequest: false,
  orderData: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  orderModalData: null,
  newOrderNumber: 0
};

const ingredientsWithDeleted: TOrderSlice = {
  orderRequestItems: {
    bun: {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: '1'
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        id: '2'
      }
    ]
  },
  orderRequest: false,
  orderData: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  orderModalData: null,
  newOrderNumber: 0
};

const ingredientsWithChangedOrder: TOrderSlice = {
  orderRequestItems: {
    bun: {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        id: '2'
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: '1'
      },
      {
        _id: '643d69a5c3f7b9001cfa0943',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
        id: '3'
      }
    ]
  },
  orderRequest: false,
  orderData: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  orderModalData: null,
  newOrderNumber: 0
};

describe('OrderSlice test', () => {
  test('Root reducer initialize test', () => {
    const action = { type: 'SOME_ACTION' };
    const state = RootReducer(undefined, action);
    expect(state).toBeDefined();
    expect(state.order).toBeDefined();
    expect(state.ingredients).toBeDefined();
    expect(state.feeds).toBeDefined();
    expect(state.user).toBeDefined();
  });

  test('add and delete ingredinet test', () => {
    store.dispatch(addIngredient(ingredient));
    const order = store.getState().order.orderRequestItems;
    expect(order).toEqual({
      bun: null,
      ingredients: [
        {
          ...ingredient,
          id: order.ingredients[0].id
        }
      ]
    });
  });

  test('RootReducer delete ingredient test', () => {
    const state = RootReducer(
      {
        order: preloadedState,
        ingredients: undefined,
        feeds: undefined,
        user: undefined
      },
      removeIngredient(ingredient)
    );

    expect(state.order.orderRequestItems).toEqual(
      ingredientsWithDeleted.orderRequestItems
    );
  });

  test('change ingredients order', () => {
    const state = RootReducer(
      {
        order: preloadedState,
        ingredients: undefined,
        feeds: undefined,
        user: undefined
      },
      moveIngredientDown({
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: '1'
      })
    );

    expect(state.order.orderRequestItems).toEqual(
      ingredientsWithChangedOrder.orderRequestItems
    );

    const changedState = RootReducer(
      {
        order: ingredientsWithChangedOrder,
        ingredients: undefined,
        feeds: undefined,
        user: undefined
      },
      moveIngredientUp({
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: '1'
      })
    );

    expect(changedState.order.orderRequestItems).toEqual(
      preloadedState.orderRequestItems
    );
  });

  test('sending order request test', () => {
    store.dispatch({ type: 'order/make/pending' });
    expect(store.getState().order.orderRequest).toBe(true);

    store.dispatch({
      type: 'order/make/fulfilled',
      payload: { order: { number: 123 } }
    });
    expect(store.getState().order.newOrderNumber).toBe(123);

    store.dispatch({
      type: 'order/make/rejected',
      error: 'Mocked error'
    });
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('Mocked error');
  });

  test('getOrderByNumber test', async () => {
    await store.dispatch(getOrderByNumber(1));
    expect(store.getState().order.orderModalData).toEqual(ingredient);
  });
});
