import { TodayWaterListItem } from '../TodayWaterListItem/TodayWaterListItem';
import css from "./TodayWaterList.module.css"
export const TodayWaterList = ({ arrayWater }) => {
  return (
    <ul className={css.todayWaterList}>
      {arrayWater.map(item => {
       return  <TodayWaterListItem waterItem={item} />;
      })}
    </ul>
  );
};
