
import Icon from "../Icon/Icon"

import { ButtonBtn } from '../ButtonBtn/ButtonBtn'

import css from './TodayWaterListItem.module.css';

export const TodayWaterListItem = ({ waterItem }) => {
  const { waterVolume, date } = waterItem;
  const time = date.split('T')[1];
  const waterVolumeLiter =
    waterVolume >= 1000 ? `${waterVolume / 1000} L` : `${waterVolume} ml`;

  return (
    <div className={css.todayWaterListItemContainer}>
      <div className={css.todayWaterListItemValueContainer}>
      
        {/* <ReactSVG src={svgIcon} className={css.todayWaterListItemValueIcon} /> */}

        <Icon name ={"glass"} className={css.todayWaterListItemValueIconNew}/>


        <span className={css.todayWaterListItemValueLiter}>
          {waterVolumeLiter}
        </span>
        <span className={css.todayWaterListItemValueTime}> {time}</span>
      </div>
      <div className={css.todayWaterListItemButtonsContainer}>
        
        <ButtonBtn type ={'submit'} clasNameBtn={css.buttonBtnEdit} classNameBtnIcon={css.buttonBtnEditIcon} icon={"notebook"} />
        <ButtonBtn type ={'submit'} clasNameBtn={css.buttonBtnDelete} classNameBtnIcon={css.buttonBtnDeleteIcon}  icon={"trashbox"} />
      </div>

     
    </div>
  );
};

//
