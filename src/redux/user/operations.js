import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (_, { getState }) => {
    const token = getState().auth.accessToken;
    console.log(token);
    const res = await axios.get("/users/userInfo", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  },
  {
    condition: (_, { getState }) => {
      const token = getState().auth.accessToken;
      return token !== null;
    },
  }
);

export const updateUserInfo = createAsyncThunk(
  "users/updateUserInfo",
  async (newUserData, { getState }) => {
    const token = getState().auth.accessToken;

    const res = await axios.patch("/users/", newUserData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  {
    condition: (_, { getState }) => {
      const token = getState().auth.accessToken;
      return token !== null;
    },
  }
);

export const updateUserPhoto = createAsyncThunk(
  "users/updateUserPhoto",
  async (newPhoto, { getState }) => {
    const token = getState().auth.accessToken;
    console.log(token);
    const res = await axios.patch("/users/avatar", newPhoto, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
  {
    condition: (_, { getState }) => {
      const token = getState().auth.accessToken;
      return token !== null;
    },
  }
);

export const updateUserAmountOfWater = createAsyncThunk(
  "users/updateUserAmountOfWater",
  async (newUserWaterAmount, { getState }) => {
    const token = getState().auth.accessToken;

    const res = await axios.patch("/users/waterAmount", newUserWaterAmount, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  {
    condition: (_, { getState }) => {
      const token = getState().auth.accessToken;
      return token !== null;
    },
  }
);
