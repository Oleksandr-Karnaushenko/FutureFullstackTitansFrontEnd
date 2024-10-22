import { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TodayWaterModal } from '../TodayWaterModal/TodayWaterModal';

import { getCurrentDayInfoAPI } from '../../redux/water/waterOperation/';
import { selectDayInfo } from '../../redux/water/waterSelectors';
import { TodayWaterList } from '../TodayWaterList/TodayWaterList';
import { ButtonBtn } from '../ButtonBtn/ButtonBtn';

import css from './TodayWater.module.css';

export const TodayWater = () => {

// const [isModalOpen, setIsModalOpen] = useState(false)
// const toggleModal = ()=>{
//   setIsModalOpen(!isModalOpen);
// }

  const dayInfo = useSelector(selectDayInfo);
  const dispatch = useDispatch();
  const arrayWater = dayInfo.waterVolumeTimeEntries;
  useEffect(() => {
    dispatch(getCurrentDayInfoAPI());
  }, [dispatch]);

  return (
    <div className={css.todayWaterBlock}>
      <h3 className={css.todayWaterSubtitle}>Today</h3>
      <TodayWaterList arrayWater={arrayWater} />
      <ButtonBtn
        classNameBtnIcon={css.buttonSubmitAddIcon}
        clasNameBtn={css.buttonSubmitAdd}
        icon={'plus'}
        name={'Add Water'}
        type={'button'}
      />
      {/* <TodayWaterModal
        title="Delete entry"
        text="Are you sure you want to delete the entry?"
      >
        <ButtonBtn
          // classNameBtnIcon={css.buttonSubmitAddIcon}
          clasNameBtn={css.buttonModalCancel}
          icon={'plus'}
          name={'Delete'}
          type={'button'}
        />

        <ButtonBtn
          // classNameBtnIcon={css.buttonSubmitAddIcon}
          clasNameBtn={css.buttonModalCancel}
          icon={'plus'}
          name={'Close'}
          type={'button'}
        />
      </TodayWaterModal> */}
    </div>
  );
};
