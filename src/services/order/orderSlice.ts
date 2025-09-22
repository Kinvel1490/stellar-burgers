import { createSlice } from '@reduxjs/toolkit';
import {
  TIngredient,
  TOrdersData,
  TConstructorIngredient,
  TOrder,
  TOrderRequestItems
} from '@utils-types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { makeOrder, getOrderByNumber } from './actions';

interface TOrderSlice {
  orderRequestItems: TOrderRequestItems;
  orderRequest: boolean;
  orderData: TOrdersData;
  orderModalData: TOrder | null;
  newOrderNumber: number;
}

const initialState: TOrderSlice = {
  orderRequestItems: {
    bun: null,
    ingredients: []
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

const calculateIngredients = (
  ingredients: TConstructorIngredient[],
  targetIngredient: TConstructorIngredient,
  increment: number
) => {
  let ingredientIndex: number = -1;
  ingredients.forEach((element) => {
    if (element.id === targetIngredient.id) {
      ingredientIndex = ingredients.indexOf(element);
    }
  });
  const ingredient = ingredients[ingredientIndex];
  const prevIngredient = ingredients[ingredientIndex + increment];
  ingredients[ingredientIndex + increment] = ingredient;
  ingredients[ingredientIndex] = prevIngredient;
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TIngredient>) {
      const order = state.orderRequestItems;
      action.payload.type === 'bun'
        ? (order.bun = action.payload)
        : order.ingredients.push({
            ...action.payload,
            id: action.payload.name + Math.random() * 100000
          });
    },
    removeIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.orderRequestItems.ingredients =
        state.orderRequestItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload.id
        );
    },
    moveIngredientUp(state, action: PayloadAction<TConstructorIngredient>) {
      const ingredients = state.orderRequestItems.ingredients;
      calculateIngredients(ingredients, action.payload, -1);
    },
    moveIngredientDown(state, action: PayloadAction<TConstructorIngredient>) {
      const ingredients = state.orderRequestItems.ingredients;
      calculateIngredients(ingredients, action.payload, 1);
    },
    onOrderModalClose(state) {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.orderRequest = true;
        state.newOrderNumber = action.payload.order.number;
        state.orderRequestItems = {
          bun: null,
          ingredients: []
        };
      })
      .addCase(makeOrder.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderModalData = action.payload.orders[0];
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  onOrderModalClose
} = orderSlice.actions;
