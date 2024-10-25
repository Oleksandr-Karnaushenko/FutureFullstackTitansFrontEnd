import DailyNormaModal from '../DailyNormaModal/DailyNormaModal';
import { useState } from 'react';
import css from './DailyNorma.module.css';
import DailyNormaModalMD from '../DailyNormaModalMD/DailyNormaModalMD.jsx';
import { useSelector } from 'react-redux';
import { selectNormWater } from '../../redux/auth/authSelectors.js';

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
      <div className={css.wrapper}>
        {/*Ця кнопка для тесту так як твоя дізейблед*/}
        <button className={css.editBtn} onClick={handleOpenModal}>
          Edit
        </button>
      </div>
      {isModalOpen && (
        <DailyNormaModalMD
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
}
