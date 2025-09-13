import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  getOrdersApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TLoginData, TRegisterData } from '@api';

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => loginUserApi(data)
);

export const getUser = createAsyncThunk('user/get', async () => getUserApi());

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => registerUserApi(data)
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const logoutUser = createAsyncThunk('user/logout', async () =>
  logoutApi()
);

export const getUserOrders = createAsyncThunk('user/get_orders', async () =>
  getOrdersApi()
);
