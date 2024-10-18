import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { toastError, toastSuccess } from '../../services/toastNotification';
// export const getMonthInfoAPI = async date => {
//   const { data } = await axios.post('water/month', date);

//   return data;
// };
export const getCurrentMonthInfoThunk = createAsyncThunk(
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

export const getCurrentDayInfoThunk = createAsyncThunk(
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

export const addWaterThunk = createAsyncThunk(
  'water/add',
  async (data, thunkAPI) => {
    const { drink } = data;
    try {
      const { data } = await axios.post(`water`, drink);
      toastSuccess('Drink has been added successful');
      return data;
    } catch (error) {
      toastError('Sorry, something went wrong. Please, try again');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteDrinkThunk = createAsyncThunk(
  'water/delete',
  async (drinkId, thunkAPI) => {
    try {
      const { data } = await axios.delete(`water/${drinkId}`);
      toastSuccess('Drink has been deleted successful');
      return data;
    } catch (error) {
      toastError('Sorry, something went wrong. Please, try again');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editDrinkThunk = createAsyncThunk(
  'water/edit',
  async (drink, thunkAPI) => {
    const { id, time, ml } = drink;
    try {
      const { data } = await axios.patch(`water/${id}`, { time, ml });
      toastSuccess('Drink has been edited successful');
      return data;
    } catch (error) {
      toastError('Sorry, something went wrong. Please, try again');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const editDailyNorm = createAsyncThunk(
//   'auth/editDailyNorm',
//   async (norm, { rejectWithValue }) => {
//     try {
//       const date = new Date();
//       const { data } = await axios.patch('/water/norm', {
//         date,
//         norm: Math.ceil(norm / 100) * 100,
//       });

//       toastSuccess('Edit successful');
//       return data;
//     } catch (error) {
//       toastError('Something went wrong');
//       return rejectWithValue(error.message);
//     }
//   }
// );
