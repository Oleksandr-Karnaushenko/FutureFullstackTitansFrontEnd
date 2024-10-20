import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { toastError, toastSuccess } from '../../services/toastNotification';
// export const getMonthInfoAPI = async date => {
//   const { data } = await axios.post('water/month', date);

//   return data;
// };
export const getCurrentMonthInfoAPI = createAsyncThunk(
  'water/getMonth',
  async (_, thunkAPI) => {
    try {
      const currentDate = new Date();
      const { data } = await axios.post('water/month', {
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
      });
      // const currentMonth = await getMonthInfoAPI({
      //   month: currentDate.getMonth() + 1,
      //   year: currentDate.getFullYear(),
      // });
      // return currentMonth;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCurrentDayInfoAPI = createAsyncThunk(
  'water/getDay',
  async (_, thunkAPI) => {
    try {
      const date = new Date();
      const { data } = await axios.post('water', { date });

      return data;
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

      const backEndData = data.data;

      toastSuccess('Drink has been added successful');

      return backEndData;
    } catch (error) {
      toastError('Sorry, something went wrong. Please, try again');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editDrinkAPI = createAsyncThunk(
  'water/edit',
  async (drink, thunkAPI) => {
    const { id, time, ml } = drink;
    try {
      const { data } = await axios.patch(`water/${id}`, { time, ml });

      const backEndData = data.data;

      toastSuccess('Drink has been edited successful');

      return backEndData;
    } catch (error) {
      toastError('Sorry, something went wrong. Please, try again');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteDrinkAPI = createAsyncThunk(
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
