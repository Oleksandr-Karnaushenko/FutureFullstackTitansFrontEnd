export const selectMonthly = (state) => state.water.monthly;
export const selectTodayWater = (state) => state.water.todayWater;

export const chosenDate = (state) => state.water.chosenDate;

export const selectWaterLoading = (state) => state.water.loading;
export const selectWaterError = (state) => state.water.error;

export const selectTodayWaterAmount = (state) =>
  state.water.todayWater.reduce((acc, item) => acc + item.amount, 0);

//Select Days with Incomplete Water Intake: You can use this selector to highlight days where the user didn't meet their water goal.
export const selectIncompleteDays = (state) =>
  state.water.monthly.filter((day) => day.fulfillNorma < 100);

//Select Water Intake Details for a Specific Day: This selector retrieves water intake details for a given day.
export const selectWaterDetailsByDate = (state, date) =>
  state.water.monthly.find((day) => day.date === date);

//Select Percentage of Water Intake for Today: This selector calculates the percentage of the daily goal met today.
export const selectTodayWaterPercentage = (state) => {
  const totalAmount = state.water.todayWater.reduce(
    (acc, item) => acc + item.waterAmount,
    0
  );
  const dailyNorm =
    state.water.monthly.find(
      (day) => day.date === new Date().toISOString().split("T")[0]
    )?.dailyNorma || 0;
  return (totalAmount / dailyNorm) * 100;
};
