
import { TodayWaterListItem } from '../TodayWaterListItem/TodayWaterListItem';

import { useSelector} from 'react-redux';
import * as selector from '../../redux/water/waterSelectors';

import css from "./TodayWaterList.module.css"

  export const TodayWaterList = ( ) => {
  const dayInfo = useSelector(selector.selectDayInfo);
  const arrayWater = dayInfo.waterVolumeTimeEntries;

  return (
    <ul className={css.todayWaterList}>
      {arrayWater.map(item => {
       return <li key={item._id}><TodayWaterListItem waterItem={item} /></li> ;
      })}
    </ul>
  );
};
