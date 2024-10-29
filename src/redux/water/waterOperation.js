import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectDailyNorm } from '../auth/authSlice.js';

import { toastError, toastSuccess } from '../../services/toastNotification';
import { axiosInstance } from '../auth/authOperation.js';

export const getCurrentMonthInfoAPI = createAsyncThunk(
  'water/getMonth',
  async (data, thunkAPI) => {
    const { month, year } = data;

    try {
      const { data } = await axiosInstance.get(
        `water/monthInfo?month=${month}&year=${year}`
      );

      const backEndData = data.data.data;

      return backEndData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.message);
    }
  }
);

export const getCurrentDayInfoAPI = createAsyncThunk(
  'water/getDay',
  async (_, thunkAPI) => {
    const todayStr = new Date().toISOString();
    try {
      const { data } = await axiosInstance.get(`water/dayInfo/${todayStr}`);

      if (!data) return;

      const backEndData = data.data;

      return backEndData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.message);
    }
  }
);

export const addWaterAPI = createAsyncThunk(
  'water/add',
  async (newWater, { thunkAPI, getState }) => {
    try {
      const { data } = await axiosInstance.post(`water`, newWater);

      const backEndData = data.data;

      toastSuccess('Drink has been added successful');
      const dailyNorna = selectDailyNorm(getState());

      return { backEndData, dailyNorna };
    } catch (error) {
      toastError('Sorry, something went wrong. Please, try again');
      console.log(error.response.data.data.message);
      return thunkAPI.rejectWithValue(error.response.data.data.message);
    }
  }
);

export const editWaterAPI = createAsyncThunk(
  'water/edit',
  async (drink, { thunkAPI, getState }) => {
    const { id, editWater } = drink;
    try {
      const { data } = await axiosInstance.patch(`water/${id}`, editWater);

      const backEndData = data.data;

      toastSuccess('Drink has been edited successful');
      const dailyNorna = selectDailyNorm(getState());

      return { backEndData, dailyNorna, id };
    } catch (error) {
      toastError('Sorry, something went wrong. Please, try again');
      return thunkAPI.rejectWithValue(error.response.data.data.message);
    }
  }
);

export const deleteWaterAPI = createAsyncThunk(
  'water/delete',
  async (drinkId, { thunkAPI, getState }) => {
    try {
      await axiosInstance.delete(`water/${drinkId}`);

      toastSuccess('Drink has been deleted successful');
      const dailyNorna = selectDailyNorm(getState());

      return { drinkId, dailyNorna };
    } catch (error) {
      toastError('Sorry, something went wrong. Please, try again');
      return thunkAPI.rejectWithValue(error.response.data.data.message);
    }
  }
);

//

export const countPercent = (totalWaterVolume, dailyNorna) =>
  Math.min(Math.floor((totalWaterVolume / dailyNorna) * 100), 100);

//today
const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
export const formattedDate = `${day}.${month}`;

//date
export const dataTime = dateStr => {
  const date = new Date(dateStr);

  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  const formattedTime = `${hours}:${minutes}`;
  return formattedTime;
};
