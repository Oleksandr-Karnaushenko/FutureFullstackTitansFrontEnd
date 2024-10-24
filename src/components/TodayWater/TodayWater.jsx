import { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentDayInfoAPI } from '../../redux/water/waterOperation/';
import * as selector from '../../redux/water/waterSelectors';
import Loader from '../Loader/Loader';
import { TodayWaterList } from '../TodayWaterList/TodayWaterList';
import { ButtonBtn } from '../ButtonBtn/ButtonBtn';

import css from './TodayWater.module.css';

export const TodayWater = () => {
  const isRefreshing = useSelector(selector.selectWaterIsRefreshing);
  const error = useSelector(selector.selectWaterError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentDayInfoAPI());
  }, [dispatch]);

  return (
    <div className={css.todayWaterBlock}>
      <h3 className={css.todayWaterSubtitle}>Today</h3>
      {isRefreshing && (
        <div className={css.todayWaterLoader}>
          <Loader />
        </div>
      )}
      {error && <p className={css.todayWaterError}>{error}</p>}

      <TodayWaterList />
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
