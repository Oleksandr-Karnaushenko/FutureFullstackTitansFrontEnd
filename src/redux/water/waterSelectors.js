//Data
export const selectDayInfo = state => state.water.dayInfo;
export const selectDayTotalWaterVolume = state =>
  state.water.dayInfo.totalWaterVolume;
export const selectDayWaterVolumeInPercent = state =>
  state.water.dayInfo.waterVolumeInPercent;
export const selectDayWaterVolumeTimeEntries = state =>
  state.water.dayInfo.waterVolumeTimeEntries;

//Loading
export const selectWaterIsRefreshing = state => state.water.isRefreshing;

//Errors
export const selectWaterError = state => state.water.dayError;
