import { useEffect } from 'react';
import css from './TodayWaterModal.module.css';

export const TodayWaterModal = ({ isOpen, onClose, title, text, children }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    // Удаляем обработчик при размонтировании компонента или когда модалка закрыта
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }
  return (
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
      <div className={css.modalContent}>
        <p className={css.modalTitle}>{title}</p>
        <p className={css.modalText}>{text}</p>
        <div className={css.modalButtons}>{children}</div>
      </div>
    </div>
  );
};
