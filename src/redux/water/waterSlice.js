import { createSlice } from '@reduxjs/toolkit';
import {
  getCurrentMonthInfoThunk,
  getCurrentDayInfoThunk,
  addWaterThunk,
  deleteDrinkThunk,
  editDrinkThunk,
} from './waterOperation';

const initialState = {
  month: null,
  dayInfo: null,
  registerDay: null,
  monthDataLoading: false,
  dayDataLoading: false,
  monthError: null,
  dayError: false,
  isAddDrinkLoading: false,
  isDeleting: false,
  isEditingDrink: false,
  isEditingNorm: false,
};

const waterSlice = createSlice({
  name: 'water',
  initialState,

  extraReducers: builder => {
    builder
      //getCurrentMonthInfoThunk
      .addCase(getCurrentMonthInfoThunk.pending, state => {
        state.monthDataLoading = true;
        state.monthError = false;
        state.month = null;
      })
      .addCase(getCurrentMonthInfoThunk.fulfilled, (state, { payload }) => {
        state.monthDataLoading = false;
        state.month = [...payload];
      })
      .addCase(getCurrentMonthInfoThunk.rejected, (state, { payload }) => {
        state.monthDataLoading = false;
        state.monthError = payload;
      })
      //getCurrentDayInfoThunk
      .addCase(getCurrentDayInfoThunk.pending, state => {
        state.dayDataLoading = true;
        state.dayError = false;
      })
      .addCase(getCurrentDayInfoThunk.fulfilled, (state, { payload }) => {
        state.dayDataLoading = false;
        state.dayInfo = { ...payload.dayInfo };
        state.registerDay = payload.startDay;
      })
      .addCase(getCurrentDayInfoThunk.rejected, (state, { payload }) => {
        state.dayDataLoading = false;
        state.dayError = payload;
      })
      //addWaterThunk
      .addCase(addWaterThunk.pending, state => {
        state.isAddDrinkLoading = tru e;
      })
      .addCase(addWaterThunk.fulfilled, (state, { payload }) => {
        state.isAddDrinkLoading = false;
        state.dayInfo = { ...payload };
      })
      .addCase(addWaterThunk.rejected, state => {
        state.isAddDrinkLoading = false;
      })
      //deleteDrinkThunk
      .addCase(deleteDrinkThunk.pending, state => {
        state.isDeleting = true;
      })
      .addCase(deleteDrinkThunk.fulfilled, (state, { payload }) => {
        state.isDeleting = false;
        state.dayInfo = { ...payload };
      })
      .addCase(deleteDrinkThunk.rejected, state => {
        state.isDeleting = false;
      })
      //editDrinkThunk
      .addCase(editDrinkThunk.pending, state => {
        state.isEditingDrink = true;
      })
      .addCase(editDrinkThunk.fulfilled, (state, { payload }) => {
        state.isEditingDrink = false;
        state.dayInfo = { ...payload };
      })
      .addCase(editDrinkThunk.rejected, state => {
        state.isEditingDrink = false;
      });
  },
});
export default waterSlice.reducer;
