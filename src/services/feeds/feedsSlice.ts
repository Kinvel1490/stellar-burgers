import { createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeeds } from './actions';

interface TFeedSlice {
  feeds: TOrdersData;
}

const initialState: TFeedSlice = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

export const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeeds.fulfilled, (state, action) => {
      state.feeds = action.payload;
    });
  }
});
