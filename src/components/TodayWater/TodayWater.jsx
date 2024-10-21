import { TodayWaterList } from '../TodayWaterList/TodayWaterList';
import { ButtonBtn } from '../ButtonBtn/ButtonBtn';
// import svgAdd from '../../images/icons/cross.svg';

import css from './TodayWater.module.css';

const arrayWater = [
  {
    date: '2024-10-14T14:20',
    dailyNorm: 1800,
    waterVolume: 250,
    userId: '11111111111',
  },
  {
    date: '2024-10-14T14:20',
    dailyNorm: 1800,
    waterVolume: 250,
    userId: '11111111111',
  },
  {
    date: '2024-10-14T14:20',
    dailyNorm: 1800,
    waterVolume: 250,
    userId: '11111111111',
  },
  {
    date: '2024-10-14T14:20',
    dailyNorm: 1800,
    waterVolume: 250,
    userId: '11111111111',
  },
  {
    date: '2024-10-14T14:20',
    dailyNorm: 1800,
    waterVolume: 250,
    userId: '11111111111',
  },
];
export const TodayWater = () => {
  return (
    <div className={css.todayWaterBlock}>
      <h3 className={css.todayWaterSubtitle}>Today</h3>
      <TodayWaterList arrayWater={arrayWater} />
      <ButtonBtn
        classNameBtnIcon={css.buttonSubmitAddIcon}
        clasNameBtn={css.buttonSubmitAdd}
        icon={"plus"}
        name={'Add Water'}
        type={"button"}
      />
    </div>
  );
};
