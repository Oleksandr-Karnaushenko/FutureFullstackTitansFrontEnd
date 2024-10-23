import { useEffect, useRef, useState } from "react";
import css from "./UserLogoModal.module.css";
import SettingModal from "../SettingModal/SettingModal";
import UserLogoutModal from "../UserLogoutModal/UserLogoutModal";

const UserLogoModal = ({ isOpen, onClose, anchorPosition }) => {
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const modalRef = useRef(null);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleOpenSettings = () => {
    setIsSettingModalOpen(true);
  };

  const handleOpenLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingModalOpen(false);
  };

  const handleCloseLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const handleConfirmLogout = () => {
    // Додайте тут будь-яку додаткову логіку для виходу з акаунту
    console.log('User logged out');
    setIsLogoutModalOpen(false);
    onClose(); // Закриваємо також UserLogoModal після логауту
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
            <svg className={css.buttonsSettingsImg}>
              <use href="../src/assets/images/icons.svg#icon-settings" />
            </svg>
            <button className={css.settingsButton} onClick={handleOpenSettings}>
              Settings
            </button>
          </div>
          <div className={css.buttonsLogout}>
            <svg className={css.buttonsLogout}>
              <use href="../src/assets/images/icons.svg#icon-logout" />
            </svg>
            <button className={css.logoutButton} onClick={handleOpenLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Modal for settings */}
        {isSettingModalOpen && (
          <SettingModal
            isOpen={isSettingModalOpen}
            onClose={handleCloseSettings}
          />
        )}

        {/* Modal for logout */}
        {isLogoutModalOpen && (
          <UserLogoutModal
            isOpen={isLogoutModalOpen}
            onClose={handleCloseLogout}
            onLogout={handleConfirmLogout} // Логіка логауту
          />
        )}
      </div>
    </div>
  );
};

export default UserLogoModal;
