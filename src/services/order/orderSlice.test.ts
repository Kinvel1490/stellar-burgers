import {
  expect,
  describe,
  test,
  jest,
  beforeAll,
  beforeEach
} from '@jest/globals';
import orderSlice, {
  addIngredient,
  moveIngredientDown,
  moveIngredientUp,
  onOrderModalClose,
  removeIngredient,
  TOrderSlice
} from './orderSlice';
import { configureStore } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

jest.mock('@api');

beforeAll(() => {
  jest.spyOn(console, 'log');
});

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.resetAllMocks();
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

const mockOrder: TOrder = {
  _id: '1',
  status: 'done',
  name: 'Mocked order',
  createdAt: '0',
  updatedAt: '0',
  number: 1,
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa093e',
    '643d69a5c3f7b9001cfa0943'
  ]
};

describe('OrderSlice test', () => {
  test('add and delete ingredinet test', () => {
    const state = orderSlice(undefined, addIngredient(ingredient));
    const order = state.orderRequestItems;
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
    const state = orderSlice(preloadedState, removeIngredient(ingredient));
    expect(state.orderRequestItems).toEqual(
      ingredientsWithDeleted.orderRequestItems
    );
  });

  test('change ingredients order', () => {
    const state = orderSlice(
      preloadedState,
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
    expect(state.orderRequestItems).toEqual(
      ingredientsWithChangedOrder.orderRequestItems
    );

    const changedState = orderSlice(
      ingredientsWithChangedOrder,
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
    expect(changedState.orderRequestItems).toEqual(
      preloadedState.orderRequestItems
    );
  });

  test('onOrderModalClose test', () => {
    const state = orderSlice({
        ...preloadedState,
        orderRequest: true,
        orderModalData: mockOrder
      },
      onOrderModalClose()
    );
    expect(state.orderModalData).toBeNull;
    expect(state.orderRequest).toBeFalsy();
  });

  test('sending order request test', () => {
    const store = configureStore({
      preloadedState,
      reducer: orderSlice
    });
    store.dispatch({ type: 'order/make/pending' });
    expect(store.getState().orderRequest).toBe(true);

    store.dispatch({
      type: 'order/make/fulfilled',
      payload: { order: { number: 123 } }
    });
    expect(store.getState().newOrderNumber).toBe(123);

    store.dispatch({
      type: 'order/make/rejected',
      error: 'Mocked error'
    });
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('Mocked error');
  });

  test('getOrderByNumber test', () => {
    const store = configureStore({
      preloadedState,
      reducer: orderSlice
    });
    store.dispatch({
      type: 'order/get_by_number/fulfilled',
      payload: { orders: [mockOrder] }
    });
    expect(store.getState().orderModalData).toEqual(mockOrder);
  });
});
