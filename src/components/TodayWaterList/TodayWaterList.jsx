import { TodayWaterListItem } from '../TodayWaterListItem/TodayWaterListItem';
import css from "./TodayWaterList.module.css"
export const TodayWaterList = ({ arrayWater }) => {
  return (
    <ul className={css.todayWaterList}>
      {arrayWater.map(item => {
       return <li key={item._id}><TodayWaterListItem waterItem={item} /></li> ;
      })}
    </ul>
  );
};
