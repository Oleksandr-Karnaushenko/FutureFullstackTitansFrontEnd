import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './style.module.css';
import PropTypes from 'prop-types';

export default function Modal({ modalTitle, children, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    const handleKeyDown = ({ key }) => {
      if (key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalWrapper} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalTop}>
          <h3>{modalTitle}</h3>
          <button onClick={onClose}>
            <svg className={styles.svg} width={20} height={20}>
              <use
                className={styles.use}
                href="assets/imges/icons.svg#icon-cross"
              ></use>
            </svg>
          </button>
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.propTypes = {
  modalTitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
