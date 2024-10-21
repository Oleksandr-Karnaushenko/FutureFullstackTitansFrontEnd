import { createSlice } from '@reduxjs/toolkit';
import {
  getCurrentMonthInfoAPI,
  getCurrentDayInfoAPI,
  addWaterAPI,
  deleteDrinkAPI,
  editDrinkAPI,
} from './waterOperation';

const initialState = {
  monthInfo: [],
  dayInfo: {
    totalWaterVolume: null,
    waterVolumeInPercent: null,
    waterVolumeTimeEntries: [],
  },
  isRefreshing: false,
  error: null,
};

const waterSlice = createSlice({
  name: 'water',
  initialState,

  extraReducers: builder => {
    builder
      //getCurrentMonthInfoAPI
      .addCase(getCurrentMonthInfoAPI.pending, state => {
        state.monthDataLoading = true;
        state.monthError = false;
        state.month = null;
      })
      .addCase(getCurrentMonthInfoAPI.fulfilled, (state, { payload }) => {
        state.monthDataLoading = false;
        state.month = [...payload];
      })
      .addCase(getCurrentMonthInfoAPI.rejected, (state, { payload }) => {
        state.monthDataLoading = false;
        state.monthError = payload;
      })

      //getCurrentDayInfoAPI
      .addCase(getCurrentDayInfoAPI.pending, state => {
        state.dayDataLoading = true;
        state.dayError = false;
      })
      .addCase(getCurrentDayInfoAPI.fulfilled, (state, { payload }) => {
        state.dayDataLoading = false;
        state.dayInfo = { ...payload.dayInfo };
        state.registerDay = payload.startDay;
      })
      .addCase(getCurrentDayInfoAPI.rejected, (state, { payload }) => {
        state.dayDataLoading = false;
        state.dayError = payload;
      })

      //addWaterAPI
      .addCase(addWaterAPI.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(addWaterAPI.fulfilled, state => {
        state.isRefreshing = false;
      })
      .addCase(addWaterAPI.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      })
      //editDrinkAPI
      .addCase(editDrinkAPI.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(editDrinkAPI.fulfilled, state => {
        state.isRefreshing = false;
      })
      .addCase(editDrinkAPI.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      })
      //deleteDrinkAPI
      .addCase(deleteDrinkAPI.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(deleteDrinkAPI.fulfilled, state => {
        state.isRefreshing = false;
      })
      .addCase(deleteDrinkAPI.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      });
  },
});
export default waterSlice.reducer;
