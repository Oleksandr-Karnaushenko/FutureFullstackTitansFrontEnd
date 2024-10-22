import { TodayWaterList } from '../TodayWaterList/TodayWaterList';
import { ButtonBtn } from '../ButtonBtn/ButtonBtn';

import css from './TodayWater.module.css';


const arrayWater= [
{
  "_id": "6716a891ad47789dfc91af6a",
  "waterVolume": 500,
  "time": "10:40"
},
{
  "_id": "6716a89cad47789dfc91af6e",
  "waterVolume": 500,
  "time": "10:40"
},
{
  "_id": "6716a8b6ad47789dfc91af72",
  "waterVolume": 1000,
  "time": "12:40"
},
{
  "_id": "6716a8c9ad47789dfc91af76",
  "waterVolume": 2000,
  "time": "16:40"
}
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
