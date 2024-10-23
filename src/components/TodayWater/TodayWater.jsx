import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentDayInfoAPI } from '../../redux/water/waterOperation/';
import * as selector from '../../redux/water/waterSelectors';
import Loader from '../Loader/Loader';
import { TodayWaterList } from '../TodayWaterList/TodayWaterList';
import { ButtonBtn } from '../ButtonBtn/ButtonBtn';

import css from './TodayWater.module.css';

export const TodayWater = () => {
  const dayInfo = useSelector(selector.selectDayInfo);
  const isRefreshing = useSelector(selector.selectWaterIsRefreshing);
  const error = useSelector(selector.selectWaterError);

  const dispatch = useDispatch();
  const arrayWater = dayInfo.waterVolumeTimeEntries;
  // ----------------
  // Локальное состояние для массива воды
  const [waterEntries, setWaterEntries] = useState([]);

  useEffect(() => {
    if (dayInfo && dayInfo.waterVolumeTimeEntries) {
      setWaterEntries(dayInfo.waterVolumeTimeEntries);
    }
  }, [dayInfo]);

  // ---------------

  useEffect(() => {
    dispatch(getCurrentDayInfoAPI());
  }, [dispatch]);

  // ---------------
  // Обновляем массив после удаления
  const handleDelete = id => {
    setWaterEntries(prevEntries => prevEntries.filter(item => item._id !== id));
  };
  // -----------------

  return (
    <div className={css.todayWaterBlock}>
      <h3 className={css.todayWaterSubtitle}>Today</h3>
      {isRefreshing && (
        <div className={css.todayWaterLoader}>
          <Loader />
        </div>
      )}
      {error && <p className={css.todayWaterError}>{ error }</p>}
      {arrayWater.length > 0 && !isRefreshing && (
        <TodayWaterList arrayWater={waterEntries} onDelete={handleDelete} />
      )}
      <ButtonBtn
        classNameBtnIcon={css.buttonSubmitAddIcon}
        clasNameBtn={css.buttonSubmitAdd}
        icon={'plus'}
        name={'Add Water'}
        type={'button'}
      />
    </div>
  );
};
