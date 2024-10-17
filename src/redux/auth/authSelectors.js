export const getToken = state => state.auth.token;

export const getCurrentUser = state => state.auth.user;

export const getIsAuthLoading = state => state.auth.authIsLoading;

export const getUserName = state => state.auth.user.name;

export const getUserAvatar = state => state.auth.user.avatarURL;

export const getUserEmail = state => state.auth.user.email;

export const getUserGender = state => state.auth.user.gender;

export const getStartDay = state => state.auth.user.startDay;

export const getIsChangingAvatar = state => state.auth.isLoadingChangeAvatar;

export const getIsDataUpdating = state => state.auth.isDataUpdating;
