import { useEffect, useRef } from "react";
import css from "./UserLogoModal.module.css";

const UserLogoModal = ({ isOpen, onClose, onOpenSettings, onOpenLogout, anchorPosition }) => {
  const modalRef = useRef(null);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen && anchorPosition) {
      const modalElement = modalRef.current;
      modalElement.style.top = `${anchorPosition.top}px`;
      modalElement.style.left = `${anchorPosition.left}px`;
    }
  }, [isOpen, anchorPosition]);

  if (!isOpen) return null;

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal} ref={modalRef}>
        <div className={css.buttons}>
          <div className={css.buttonsSettings}>
            <svg width={'28px'} height={'28px'} className={css.buttonsSettingsImg}>
              <use width={'28px'} height={'28px'} href="../src/assets/images/icons.svg#icon-settings" />
            </svg>
            <button
              className={css.settingsButton}
              onClick={() => {
                onClose(); // Закриваємо UserLogoModal
                onOpenSettings(); // Відкриваємо модалку налаштувань
              }}
            >
              Settings
            </button>
          </div>
          <div className={css.buttonsLogout}>
            <svg width={'28px'} height={'28px'} className={css.buttonsLogout}>
              <use width={'28px'} height={'28px'} href="../src/assets/images/icons.svg#icon-logout" />
            </svg>
            <button
              className={css.logoutButton}
              onClick={() => {
                onClose(); // Закриваємо UserLogoModal
                onOpenLogout(); // Відкриваємо модалку логауту
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogoModal;
