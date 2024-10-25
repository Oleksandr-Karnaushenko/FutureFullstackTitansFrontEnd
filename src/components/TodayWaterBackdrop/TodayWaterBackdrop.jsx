import { useEffect } from 'react';
import css from './TodayWaterBackdrop.module.css';

export const TodayWaterBackdrop = ({ isOpen, onClose, children }) => {
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
        {children}
    </div>
  );
};
