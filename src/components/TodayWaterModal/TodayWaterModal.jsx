import { useEffect, useState } from 'react';
import css from './TodayWaterModal.module.css';

export const TodayWaterModal = ({ isOpen, onClose, title, text, children }) => {
    const [isMouseDownInsideModal, setIsMouseDownInsideModal] = useState(false);

    const handleMouseDown = (event) => {
        // Проверяем, что клик начинается внутри модального окна
        if (event.target.closest(`.${css.modalContent}`)) {
          setIsMouseDownInsideModal(true);
        } else {
          setIsMouseDownInsideModal(false);
        }
      };
    
      const handleMouseUp = (event) => {
        // Проверяем, что клик начался не внутри модального окна и завершился на backdrop
        if (!isMouseDownInsideModal && event.target === event.currentTarget) {
          onClose();
        }
        // Сбрасываем состояние
        setIsMouseDownInsideModal(false);
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




//   const handleBackdropClick = event => {
//     if (event.target === event.currentTarget) {
//       onClose();
//     }
//   };




  if (!isOpen) {
    return null;
  }
  return (
    // <div className={css.modalBackdrop} onClick={handleBackdropClick}>
    <div className={css.modalBackdrop}
   
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    
    >
      <div className={css.modalContent} onClick={event => event.stopPropagation()}>
        <p className={css.modalTitle}>{title}</p>
        <p className={css.modalText}>{text}</p>
        <div className={css.modalButtons}>{children}</div>
      </div>
    </div>
  );
};
