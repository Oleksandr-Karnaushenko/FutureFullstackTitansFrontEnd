import DailyNormaModal from '../DailyNormaModal/DailyNormaModal';
import { useState } from 'react';
import css from './DailyNorma.module.css';

export default function DailyNorma() {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  return (
    <>
      <div className={css.dailyWrapper}>
        <h2 className={css.title}>My daily norma</h2>
        <div className={css.normaWrap}>
          <p className={css.normaText}>1.5 L</p>
          <button className={css.editBtn} onClick={handleOpenModal}>
            Edit
          </button>
        </div>
      </div>
      <div className={css.wrapper}></div>
      {isModalOpen && (
        <DailyNormaModal isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </>
  );
}
