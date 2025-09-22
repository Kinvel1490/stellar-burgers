import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  loginUser,
  updateUser,
  getUser,
  registerUser,
  logoutUser,
  getUserOrders
} from './actions';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { TAuthResponse } from '@api';
import { TOrder } from '@utils-types';

interface TUserData {
  data: TUser | null;
  orders: TOrder[];
}

const initialState: TUserData = {
  data: null,
  orders: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        setUserParameters(action.payload, state);
      })
      .addCase(registerUser.rejected, (_, action) => {
        console.log(action.error.message);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        setUserParameters(action.payload, state);
      })
      .addCase(loginUser.rejected, (_, action) => {
        console.log(action.error.message);
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.data = null;
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
        }
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = {
          name: action.payload.user.name,
          email: action.payload.user.email
        };
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
      })
      .addCase(updateUser.rejected, (_, action) => {
        console.log(action.error.message);
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  }
});

function setUserParameters(data: TAuthResponse, state: typeof initialState) {
  state.data = {
    name: data.user.name,
    email: data.user.email
  };
  setCookie('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
}
