import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

interface AppState {
  ingredients: TIngredient[];
  isLoading: boolean;
}

const initialState: AppState = {
  ingredients: [],
  isLoading: false
};

export const getIngredients = createAsyncThunk('GET_INGREDIENTS', async () =>
  getIngredientsApi()
);

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (sliceState) => sliceState.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (_, action) => {
        action?.error && console.log(action.error);
      });
  }
});

export default ingredientSlice.reducer;
