import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getWaterByMonth = createAsyncThunk(
  "water/getWaterByMonth",
  async (month, { getState, rejectWithValue }) => {
    try {
       const accessToken = getState().auth.accessToken;

      const response = await axios.get("/water/perMonth", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: month, //! попросить сделать на беке через квери параметры, если не захотят, передавать месяц в теле запроса (вторым аргументом) и передавать заголовок контект тайпа апликейшн джсон
      });

      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.status === 404 &&
        error.response.data.message === "Entries of water not found"
      ) {
        return [];
      }
      return rejectWithValue(error.message);
    }
  }
);

// export const getWaterByDay = createAsyncThunk(
//   "water/getWaterByDay",
//   async (dateData, { getState, rejectWithValue }) => {
//     try {
//       const accessToken = getState().auth.accessToken;

//       const response = await axios.get("/water/perDay", {
//         headers: { Authorization: `Bearer ${accessToken}` },
//         params: dateData,
//       });

//       return response.data;
//     } catch (error) {
//       if (
//         error.response &&
//         error.response.status === 404 &&
//         error.response.data.message === "Entries of water not found"
//       ) {
//         return [];
//       }
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const getTodayWater = createAsyncThunk(
  "water/getTodayWater",
  async (date, { getState, rejectWithValue }) => {
    try {
      const accessToken = getState().auth.accessToken;

      const response = await axios.get("/water/perDay", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: date,
      });

      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.status === 404 &&
        error.response.data.message === "Entries of water not found"
      ) {
        return [];
      }
      return rejectWithValue(error.message);
    }
  }
);
export const postWater = createAsyncThunk(
  "/water",
  async (data, { getState, rejectWithValue }) => {
    try {
      const accessToken = getState().auth.accessToken;

      const response = await axios.post("/water", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: data, //! same thing as for the perMonth
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const patchWater = createAsyncThunk(
  "water/patchtWater",
  async ({ id, patchedData }, { getState, rejectWithValue }) => {
    try {
      const accessToken = getState().auth.accessToken;

      const response = await axios.patch(`water/${id}`, patchedData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  "water/delWater",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const accessToken = getState().auth.accessToken;

      const response = await axios.delete(`water/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
