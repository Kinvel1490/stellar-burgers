import { combineSlices } from '@reduxjs/toolkit';
import { orderSlice } from './order/orderSlice';
import { ingredientSlice } from './ingredientSlice';
import { feedSlice } from './feeds/feedsSlice';
import { userSlice } from './user/userSlice';

const RootReducer = combineSlices(
  orderSlice,
  ingredientSlice,
  feedSlice,
  userSlice
);

export default RootReducer;
