import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  loginUser,
  getUser,
  registerUser,
  logoutUser,
  updateUser,
  getUserOrders
} from './actions';
import { TOrder } from '@utils-types';

export interface TUserData {
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
        setUserParameters(action.payload.user, state);
      })
      .addCase(registerUser.rejected, (_, action) => {
        console.log(action.error.message);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        setUserParameters(action.payload.user, state);
      })
      .addCase(loginUser.rejected, (_, action) => {
        console.log(action.error.message);
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        console.log(action);
        if (action.payload.success) {
          state.data = null;
        }
      })
      .addCase(getUser.fulfilled, (state, action) => {
        setUserParameters(action.payload.user, state);
      })
      .addCase(getUser.rejected, (_, action) => {
        console.log(action.error.message);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
      })
      .addCase(updateUser.rejected, (_, action) => {
        console.log(action.error.message);
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (_, action) => {
        console.log(action.error.message);
      });
  }
});

function setUserParameters(data: TUser, state: typeof initialState) {
  state.data = {
    name: data.name,
    email: data.email
  };
}

export default userSlice.reducer;
