import { TodayWaterListItem } from '../TodayWaterListItem/TodayWaterListItem';

import { useSelector } from 'react-redux';
import * as selector from '../../redux/water/waterSelectors';

import css from './TodayWaterList.module.css';

export const TodayWaterList = () => {
  const dayInfo = useSelector(selector.selectDayInfo);
  const arrayWater = dayInfo.waterVolumeTimeEntries;
  const sortArrayWater = [...arrayWater];

  sortArrayWater.sort((a, b) => {
    const [aHours, aMinutes] = a.time.split(':').map(Number);
    const [bHours, bMinutes] = b.time.split(':').map(Number);

    return aHours - bHours || aMinutes - bMinutes;
  });

  return (
    <ul className={css.todayWaterList}>
      {sortArrayWater.map(item => {
        return (
          <li key={item._id}>
            <TodayWaterListItem waterItem={item} />
          </li>
        );
      })}
    </ul>
  );
};
