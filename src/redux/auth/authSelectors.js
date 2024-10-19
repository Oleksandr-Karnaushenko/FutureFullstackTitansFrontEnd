export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectToken = state => state.auth.token;

export const selectCurrentUser = state => state.auth.user;

export const selectUserName = state => state.auth.user.name;

export const selectUserAvatar = state => state.auth.user.avatarURL;

export const selectUserEmail = state => state.auth.user.email;

export const selectUserGender = state => state.auth.user.gender;

export const selectNormWater = state => state.auth.user.norm;

export const selectIsRefreshing = state => state.auth.isRefreshing;
