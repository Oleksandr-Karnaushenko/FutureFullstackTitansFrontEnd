// import { createSlice } from "@reduxjs/toolkit";
// import {
//   fetchUser,
//   updateUser,
//   updateUserAmout,
//   updateUserPhoto,
// } from "./operations";
// const userSlice = createSlice({
//   name: "users",
//   initialState: {
//     data: null,
//     isLoading: false,
//     isError: false,
//     errorMessage: "",
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchUser.fulfilled, (state, action) => {
//         state.data = action.payload;
//         console.log(action.payload);
//         state.isLoading = false;
//         state.isError = false;
//       })
//       .addCase(fetchUser.rejected, (state, action) => {
//         state.isError = true;
//         state.isLoading = false;
//         state.errorMessage = action.payload;
//       })
//       .addCase(updateUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(updateUser.fulfilled, (state, action) => {
//         state.data = action.payload;
//         console.log(action.payload);

//         state.isLoading = false;
//         state.isError = false;
//       })
//       .addCase(updateUser.rejected, (state, action) => {
//         state.isError = true;
//         state.isLoading = false;
//         state.errorMessage = action.payload;
//       })
//       .addCase(updateUserPhoto.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(updateUserPhoto.fulfilled, (state, action) => {
//         state.data = action.payload;
//         console.log(action.payload);

//         state.isLoading = false;
//         state.isError = false;
//       })
//       .addCase(updateUserPhoto.rejected, (state, action) => {
//         state.isError = true;
//         state.isLoading = false;
//         state.errorMessage = action.payload;
//       })
//       .addCase(updateUserAmout.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(updateUserAmout.fulfilled, (state, action) => {
//         state.data = action.payload;
//         console.log(action.payload);

//         state.isLoading = false;
//         state.isError = false;
//       })
//       .addCase(updateUserAmout.rejected, (state, action) => {
//         state.isError = true;
//         state.isLoading = false;
//         state.errorMessage = action.payload;
//       });
//   },
// });

// export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUser,
  updateUserInfo,
  updateUserPhoto,
  updateUserAmountOfWater,
} from "./operations";

const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
  updateInfo: {
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  updatePhoto: {
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  updateWaterAmount: {
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
};

const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      // Fetch user data
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload;
      })

      // Update user info
      .addCase(updateUserInfo.pending, (state) => {
        state.updateInfo.isLoading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.data = { ...state.data, ...action.payload };
        state.updateInfo.isLoading = false;
        state.updateInfo.isError = false;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.updateInfo.isError = true;
        state.updateInfo.isLoading = false;
        state.updateInfo.errorMessage = action.payload;
      })

      // Update user photo
      .addCase(updateUserPhoto.pending, (state) => {
        state.updatePhoto.isLoading = true;
      })
      .addCase(updateUserPhoto.fulfilled, (state, action) => {
        state.data = { ...state.data, avatar: action.payload.avatar };
        console.log(action.payload.avatar);
        state.updatePhoto.isLoading = false;
        state.updatePhoto.isError = false;
      })
      .addCase(updateUserPhoto.rejected, (state, action) => {
        state.updatePhoto.isError = true;
        state.updatePhoto.isLoading = false;
        state.updatePhoto.errorMessage = action.payload;
      })

      // Update water amount
      .addCase(updateUserAmountOfWater.pending, (state) => {
        state.updateWaterAmount.isLoading = true;
      })
      .addCase(updateUserAmountOfWater.fulfilled, (state, action) => {
        state.data = { ...state.data, waterAmount: action.payload.waterAmount };
        state.updateWaterAmount.isLoading = false;
        state.updateWaterAmount.isError = false;
      })
      .addCase(updateUserAmountOfWater.rejected, (state, action) => {
        state.updateWaterAmount.isError = true;
        state.updateWaterAmount.isLoading = false;
        state.updateWaterAmount.errorMessage = action.payload;
      });
  },
});

export default userSlice.reducer;
