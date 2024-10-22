import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { toastError, toastSuccess } from '../../services/toastNotification';
// export const getMonthInfoAPI = async date => {
//   const { data } = await axios.post('water/month', date);

//   return data;
// };
export const getCurrentMonthInfoAPI = createAsyncThunk(
  'water/getMonth',
  async (data, thunkAPI) => {
    const { month, year } = data;
    console.log('month');
    console.log(month);
    console.log('year');
    console.log(year);
    try {
      const { data } = await axios.get(
        `water/monthInfo?month=${month}&year=${year}`
      );

      const backEndData = data.data;

      return backEndData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCurrentDayInfoAPI = createAsyncThunk(
  'water/getDay',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('water/dayInfo');

      const backEndData = data.data;

      return backEndData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addWaterAPI = createAsyncThunk(
  'water/add',
  async (newWater, thunkAPI) => {
    try {
      const { data } = await axios.post(`water`, newWater);
      console.log('backdata');
      console.log(data);
      const backEndData = data.data;

      toastSuccess('Drink has been added successful');

      return backEndData;
    } catch (error) {
      toastError('Sorry, something went wrong. Please, try again');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editWaterAPI = createAsyncThunk(
  'water/edit',
  async (drink, thunkAPI) => {
    const { id, editWater } = drink;
    try {
      const { data } = await axios.patch(`water/${id}`, editWater);

      const backEndData = data.data;

      toastSuccess('Drink has been edited successful');

      return backEndData;
    } catch (error) {
      toastError('Sorry, something went wrong. Please, try again');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWaterAPI = createAsyncThunk(
  'water/delete',
  async (drinkId, thunkAPI) => {
    try {
      const { data } = await axios.delete(`water/${drinkId}`);

      const backEndData = data.data;

      toastSuccess('Drink has been deleted successful');

      return backEndData;
    } catch (error) {
      toastError('Sorry, something went wrong. Please, try again');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
