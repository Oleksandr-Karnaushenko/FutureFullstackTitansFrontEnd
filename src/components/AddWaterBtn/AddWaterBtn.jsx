import { useState } from 'react';
import css from './AddWaterBtn.module.css';
import { TodayWaterBackdrop } from '../TodayWaterBackdrop/TodayWaterBackdrop.jsx';
import AmountOfWater from '../AmountOfWater/AmountOfWater.jsx';

export default function AddWaterBtn() {
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const toggleModalAdd = () => {
    return setIsModalOpenAdd(!isModalOpenAdd);
  };

  return (
    <div className={css.btnDiv}>
      <button className={css.addWaterBtn} onClick={toggleModalAdd}>
        <svg className={css.svgCross}>
          <use href="/assets/images/icons.svg#icon-circle-plus" />
        </svg>
        AddWater
      </button>
      <TodayWaterBackdrop isOpen={isModalOpenAdd} onClose={toggleModalAdd}>
        <AmountOfWater closeModal={toggleModalAdd} />
      </TodayWaterBackdrop>
    </div>
  );
}
