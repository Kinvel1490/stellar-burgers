import { createSlice } from '@reduxjs/toolkit';
import { TFeedData } from '@utils-types';
import { getFeeds } from './actions';

interface TFeedSlice {
  feeds: TFeedData;
}

const initialState: TFeedSlice = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: true,
    error: null
  }
};

export const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.feeds.orders = action.payload.orders;
        state.feeds.total = action.payload.total;
        state.feeds.totalToday = action.payload.totalToday;
        state.feeds.isLoading = false;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.feeds.error = action.error.message;
      });
  }
});
