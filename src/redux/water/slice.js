import { createSlice } from "@reduxjs/toolkit";
import {
  getWaterByMonth,
  getTodayWater,
  postWater,
  deleteWater,
  patchWater,
} from "./operations";
import { getISOStringDate } from "../../components/MonthStatsTable/Pagitation/Pagitation";
const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const waterSlice = createSlice({
  name: "water",
  initialState: {
    chosenDate: getISOStringDate(),
    monthly: [],
    todayWater: [],
    isLoading: false,
    isError: false,
  },
   reducers: {
    setChosenDate: (state, action) => {
      state.chosenDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWaterByMonth.pending, handlePending)
      .addCase(getWaterByMonth.fulfilled, (state, action) => {
        state.monthly = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getWaterByMonth.rejected, handleRejected)

      .addCase(getTodayWater.pending, handlePending)
      .addCase(getTodayWater.fulfilled, (state, action) => {
        state.todayWater = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getTodayWater.rejected, handleRejected)

      .addCase(postWater.pending, handlePending)
      .addCase(postWater.fulfilled, (state, action) => {
        state.todayWater.push(action.payload);
        state.isLoading = false;
      })
      .addCase(postWater.rejected, handleRejected)

      .addCase(deleteWater.pending, handlePending)
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.todayWater = state.todayWater.filter((item) => {
        //   return item._id !== action.payload;
        // });
        const indexToDelete = state.todayWater.data.findIndex(
          ({ _id }) => _id === action.payload
        );
        state.todayWater.data.splice(indexToDelete, 1);
      })
      .addCase(deleteWater.rejected, handleRejected)

      .addCase(patchWater.pending, handlePending)
      .addCase(patchWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todayWater = state.todayWater.map((item) => {
          if (item._id === action.payload._id) {
            return { ...item, ...action.payload };
          }
          return item;
        });
      })
      .addCase(patchWater.rejected, handleRejected);
  },
});
export default waterSlice.reducer;
export const { setChosenDate } = waterSlice.actions;
/*
Какой фукнционал есть в приложении в разделе работы с водой?
- Сегодня
1. Добавить воду, но не более 5л за день (с указанием времени)
2. Так же слева есть измерение нормы за текущий день в процентах
3. удалить запись дня
- Месяц
1. Календарь, в котором отображается все дни месяца с указанием нормы выпитой воды в процентах
2. Если норма не выполнена - день отображается с обводкой
3. при наведении на выбранный день, есть попап с информацией про выпитую воду в этот день(дата, норма, количество выпитых доз и процент от дневной нормы)

waterData = {
today: Array[{
  waterAmount: number,
  date: string
}]

month: Array[{
  dailyNorma: number, // amount of liters per day
  fulfillNorma: number, // percent of daily norma
  date: string,
  waterServings: number // amont of water glasses
}]
  

}










*/
