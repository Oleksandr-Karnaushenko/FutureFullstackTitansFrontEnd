import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentDayInfoAPI } from '../../redux/water/waterOperation/';
import * as selector from '../../redux/water/waterSelectors';
import Loader from '../Loader/Loader';
import { TodayWaterList } from '../TodayWaterList/TodayWaterList';
import { ButtonBtn } from '../ButtonBtn/ButtonBtn';

import AmountOfWater from '../AmountOfWater/AmountOfWater';
import { TodayWaterBackdrop } from '../TodayWaterBackdrop/TodayWaterBackdrop';

import css from './TodayWater.module.css';

export default function TodayWater() {
  const isRefreshing = useSelector(selector.selectWaterIsRefreshing);
  const error = useSelector(selector.selectWaterError);
  const dispatch = useDispatch();

  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const toggleModalAdd = () => {
    return setIsModalOpenAdd(!isModalOpenAdd);
  };

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
      {/* {error && <p className={css.todayWaterError}>{error}</p>} */}

      <TodayWaterList />
      <ButtonBtn
        classNameBtnIcon={css.buttonSubmitAddIcon}
        clasNameBtn={css.buttonSubmitAdd}
        icon={'plus'}
        name={'Add Water'}
        type={'button'}
        onClick={toggleModalAdd}
      />

      {/*backdrop*/}
      <TodayWaterBackdrop isOpen={isModalOpenAdd} onClose={toggleModalAdd}>
        <AmountOfWater closeModal={toggleModalAdd} />
      </TodayWaterBackdrop>
    </div>
  );
}
