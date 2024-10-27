import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNormWater } from '../../redux/auth/authSelectors.js';
import DailyNormaModal from '../DailyNormaModal/DailyNormaModal.jsx';
import { TodayWaterBackdrop } from '../TodayWaterBackdrop/TodayWaterBackdrop.jsx';

import css from './DailyNorma.module.css';

export default function DailyNorma() {
  const dailyNorm = useSelector(selectNormWater);

  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <div className={css.dailyWrapper}>
        <h2 className={css.title}>My daily norma</h2>
        <div className={css.normaWrap}>
          <p className={css.normaText}>{dailyNorm / 1000} L</p>
          <button className={css.editBtn} onClick={handleOpenModal}>
            Edit
          </button>
        </div>
      </div>
      <div className={css.wrapper}></div>
      <TodayWaterBackdrop isOpen={isModalOpen} onClose={handleCloseModal}>
        <DailyNormaModal onClose={handleCloseModal} />
      </TodayWaterBackdrop>
    </>
  );
}
