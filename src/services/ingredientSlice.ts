import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

interface AppState {
  ingredients: TIngredient[];
}

const initialState: AppState = {
  ingredients: []
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
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
    });
  }
});

export default ingredientSlice.reducer;
