import { createSlice } from '@reduxjs/toolkit';
import {
  getCurrentMonthInfoAPI,
  getCurrentDayInfoAPI,
  addWaterAPI,
  deleteWaterAPI,
  editWaterAPI,
  countPercent,
  formattedDate,
  dataTime,
} from './waterOperation';
import { editDailyNormAPI } from '../auth/authOperation.js';

const initialState = {
  monthInfo: [],
  dayInfo: {
    totalWaterVolume: null,
    waterVolumeInPercent: null,
    waterVolumeTimeEntries: [],
  },
  isRefreshing: false,
  error: null,
  test: null,
};

const waterSlice = createSlice({
  name: 'water',
  initialState,

  extraReducers: builder => {
    builder
      //editDailyNorm
      .addCase(editDailyNormAPI.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(editDailyNormAPI.fulfilled, (state, { payload }) => {
        state.dayInfo.waterVolumeInPercent = countPercent(
          state.dayInfo.totalWaterVolume,
          payload.dailyNorm
        );
        if (state.monthInfo.length > 0)
          state.monthInfo.find(item => item.date === formattedDate).percent =
            countPercent(state.dayInfo.totalWaterVolume, payload.dailyNorm);
        state.isRefreshing = false;
      })
      .addCase(editDailyNormAPI.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      })
      //getCurrentMonthInfoAPI
      .addCase(getCurrentMonthInfoAPI.pending, state => {
        state.isRefreshing = true;
        state.error = null;
        state.monthInfo = initialState.monthInfo;
      })
      .addCase(getCurrentMonthInfoAPI.fulfilled, (state, { payload }) => {
        state.monthInfo = payload;
        state.isRefreshing = false;
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
        if (payload) state.dayInfo = payload;
        state.isRefreshing = false;
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
      .addCase(addWaterAPI.fulfilled, (state, { payload }) => {
        //dayInfo
        state.dayInfo.waterVolumeTimeEntries.push({
          _id: payload.backEndData._id,
          waterVolume: payload.backEndData.waterVolume,
          time: dataTime(payload.backEndData.date),
        });
        state.dayInfo.totalWaterVolume += payload.backEndData.waterVolume;
        state.dayInfo.waterVolumeInPercent = countPercent(
          state.dayInfo.totalWaterVolume,
          payload.dailyNorna
        );

        //monthInfo
        state.monthInfo.find(item => item.date === formattedDate).percent =
          countPercent(state.dayInfo.totalWaterVolume, payload.dailyNorna);
        state.monthInfo.find(item => item.date === formattedDate).count += 1;
        state.monthInfo.find(item => item.date === formattedDate).waterVolume =
          state.dayInfo.totalWaterVolume;

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
      .addCase(editWaterAPI.fulfilled, (state, { payload }) => {
        //dayInfo
        state.dayInfo.totalWaterVolume +=
          payload.backEndData.waterVolume -
          state.dayInfo.waterVolumeTimeEntries.find(
            item => item._id === payload.id
          ).waterVolume;

        state.dayInfo.waterVolumeTimeEntries.find(
          item => item._id === payload.id
        ).waterVolume = payload.backEndData.waterVolume;

        state.dayInfo.waterVolumeTimeEntries.find(
          item => item._id === payload.id
        ).time = dataTime(payload.backEndData.date);

        state.dayInfo.waterVolumeInPercent = countPercent(
          state.dayInfo.totalWaterVolume,
          payload.dailyNorna
        );

        //monthInfo
        state.monthInfo.find(item => item.date === formattedDate).percent =
          countPercent(state.dayInfo.totalWaterVolume, payload.dailyNorna);
        state.monthInfo.find(item => item.date === formattedDate).waterVolume =
          state.dayInfo.totalWaterVolume;

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
      .addCase(deleteWaterAPI.fulfilled, (state, { payload }) => {
        //dayInfo
        state.dayInfo.totalWaterVolume -=
          state.dayInfo.waterVolumeTimeEntries.find(
            item => item._id === payload.drinkId
          ).waterVolume;
        state.dayInfo.waterVolumeInPercent = countPercent(
          state.dayInfo.totalWaterVolume,
          payload.dailyNorna
        );
        state.dayInfo.waterVolumeTimeEntries =
          state.dayInfo.waterVolumeTimeEntries.filter(
            item => item._id !== payload.drinkId
          );
        //monthInfo
        state.monthInfo.find(item => item.date === formattedDate).percent =
          countPercent(state.dayInfo.totalWaterVolume, payload.dailyNorna);
        state.monthInfo.find(item => item.date === formattedDate).count -= 1;
        state.monthInfo.find(item => item.date === formattedDate).waterVolume =
          state.dayInfo.totalWaterVolume;

        state.isRefreshing = false;
      })
      .addCase(deleteWaterAPI.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      });
  },
});
export default waterSlice.reducer;
