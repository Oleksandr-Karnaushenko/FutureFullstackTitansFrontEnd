// export const selectUser = (state) => state.users.data;

// export const selectUserLoading = (state) => state.users.isLoading;
// export const selectUserError = (state) => state.users.isError;
// export const selectWaterDailyNorma = (state) => state.users.data.waterAmount;

import { createSelector } from "@reduxjs/toolkit";

// Селектор для данных пользователя
export const selectUserData = (state) => state.users.data;

// Селекторы для загрузки и ошибок общей информации пользователя
export const selectIsLoadingUserInfo = (state) =>
  state.users.updateInfo.isLoading;
export const selectIsErrorUserInfo = (state) => state.users.updateInfo.isError;
export const selectUserInfoErrorMessage = (state) =>
  state.users.updateInfo.errorMessage;

// Селекторы для загрузки и ошибок аватара
export const selectIsLoadingUserPhoto = (state) =>
  state.users.updatePhoto.isLoading;
export const selectIsErrorUserPhoto = (state) =>
  state.users.updatePhoto.isError;
export const selectUserPhotoErrorMessage = (state) =>
  state.users.updatePhoto.errorMessage;

// Селекторы для загрузки и ошибок изменения количества воды
export const selectIsLoadingWaterAmount = (state) =>
  state.users.updateWaterAmount.isLoading;
export const selectIsErrorWaterAmount = (state) =>
  state.users.updateWaterAmount.isError;
export const selectWaterAmountErrorMessage = (state) =>
  state.users.updateWaterAmount.errorMessage;

// Селектор для получения текущего количества воды
export const selectUserWaterAmount = createSelector(
  [selectUserData],
  (userData) => (userData ? userData.waterAmount : null)
);

// Селектор для получения аватара пользователя
export const selectUserAvatar = createSelector([selectUserData], (userData) =>
  userData ? userData.avatar : null
);

// Селектор для получения основной информации о пользователе (кроме аватара и воды)
export const selectUserInfo = createSelector([selectUserData], (userData) => {
  if (!userData) return null;
  const { name, email, otherFields } = userData; // Указать нужные поля
  return { name, email, otherFields };
});
