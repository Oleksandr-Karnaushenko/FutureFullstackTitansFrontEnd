import { useEffect, useRef } from 'react';
import css from './UserLogoModal.module.css';
import ThemeBtn from '../ThemeBtn/ThemeBtn.jsx';

const UserLogoModal = ({
  isOpen,
  onClose,
  onOpenSettings,
  onOpenLogout,
  anchorPosition,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && anchorPosition) {
      const modalElement = modalRef.current;
      modalElement.style.top = `${anchorPosition.top + 13}px`;
      modalElement.style.left = `${anchorPosition.left - 85}px`;
    }
  }, [isOpen, anchorPosition]);

  if (!isOpen) return null;

  return (
    <div className={css.modal} ref={modalRef}>
      <div className={css.buttons}>
        <div className={css.buttonsSettings}>
          <svg
            width={'16px'}
            height={'16px'}
            className={css.buttonsSettingsImg}
          >
            <use
              width={'16px'}
              height={'16px'}
              href="/assets/images/icons.svg#icon-settings"
            />
          </svg>
          <button
            className={css.settingsButton}
            onClick={() => {
              onClose();
              onOpenSettings();
            }}
          >
            Settings
          </button>
        </div>
        <div className={css.buttonsLogout}>
          <svg width={'16px'} height={'16px'} className={css.buttonsLogout}>
            <use
              width={'16px'}
              height={'16px'}
              href="/assets/images/icons.svg#icon-logout"
            />
          </svg>
          <button
            className={css.logoutButton}
            onClick={() => {
              onClose();
              onOpenLogout();
            }}
          >
            Log out
          </button>
        </div>
        <ThemeBtn />
      </div>
    </div>
  );
};

export default UserLogoModal;
