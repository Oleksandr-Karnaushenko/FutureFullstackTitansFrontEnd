import { createSlice } from '@reduxjs/toolkit';
import {
  getCurrentMonthInfoAPI,
  getCurrentDayInfoAPI,
  addWaterAPI,
  deleteWaterAPI,
  editWaterAPI,
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
        state.isRefreshing = true;
        state.error = null;
        state.monthInfo = initialState.monthInfo;
      })
      .addCase(getCurrentMonthInfoAPI.fulfilled, (state, { payload }) => {
        state.isRefreshing = false;
        state.monthInfo = payload;
      })
      .addCase(getCurrentMonthInfoAPI.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      })

      //getCurrentDayInfoAPI
      .addCase(getCurrentDayInfoAPI.pending, state => {
        state.isRefreshing = true;
        state.error = null;
        state.dayInfo = initialState.dayInfo;
      })
      .addCase(getCurrentDayInfoAPI.fulfilled, (state, { payload }) => {
        state.isRefreshing = false;
        if (payload) state.dayInfo = payload;
      })
      .addCase(getCurrentDayInfoAPI.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
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
      //editWaterAPI
      .addCase(editWaterAPI.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(editWaterAPI.fulfilled, state => {
        state.isRefreshing = false;
      })
      .addCase(editWaterAPI.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      })
      //deleteWaterAPI
      .addCase(deleteWaterAPI.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(deleteWaterAPI.fulfilled, state => {
        state.isRefreshing = false;
      })
      .addCase(deleteWaterAPI.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      });
  },
});
export default waterSlice.reducer;
