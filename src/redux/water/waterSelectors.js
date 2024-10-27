//Day
export const selectDayInfo = state => state.water.dayInfo; //all day info

export const selectTotalWaterVolume = state =>
  state.water.dayInfo.totalWaterVolume;

export const selectWaterVolumeInPercent = state =>
  state.water.dayInfo.waterVolumeInPercent;

export const selectWaterVolumeTimeEntries = state =>
  state.water.dayInfo.waterVolumeTimeEntries;

//Month
export const selectMonthInfo = state => state.water.monthInfo;

//Loading
export const selectWaterIsRefreshing = state => state.water.isRefreshing;

//Errors
export const selectWaterError = state => state.water.error;

//isWaterDataEdit
export const selectIsMonthRefreshing = state => state.water.isMonthRefreshing;
