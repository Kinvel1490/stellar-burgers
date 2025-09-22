import { orderBurgerApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const makeOrder = createAsyncThunk(
  'order/make',
  async (data: TIngredient['_id'][]) => orderBurgerApi(data)
);

export const getOrderByNumber = createAsyncThunk(
  'order/get_by_number',
  async (number: number) => getOrderByNumberApi(number)
);
