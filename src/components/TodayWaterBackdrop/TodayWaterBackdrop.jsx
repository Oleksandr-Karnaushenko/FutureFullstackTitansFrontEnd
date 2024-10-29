import { useEffect, useState } from 'react';
import css from './TodayWaterBackdrop.module.css';

export const TodayWaterBackdrop = ({ isOpen, onClose, children }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleBackdropClick = event => {
    if (!isDragging && event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

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

  // const handleBackdropClick = event => {
  //   if (event.target === event.currentTarget) {
  //     onClose();
  //   }
  // };

  if (!isOpen) {
    return null;
  }
  return (
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={event => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
