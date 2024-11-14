import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/auth/authSelectors';
import UserLogoModal from '../UserLogoModal/UserLogoModal';
import SettingModal from '../SettingModal/SettingModal';
import LogOutModal from '../LogOutModal/LogOutModal';
import css from './UserLogo.module.css';

const UserLogo = () => {
  const user = useSelector(selectCurrentUser);

  const [isUserLogoModalOpen, setIsUserLogoModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState(null);
  const buttonRef = useRef(null);

  const handleUserLogoClick = () => {
    const button = buttonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      setAnchorPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setIsUserLogoModalOpen(prev => !prev);
  };

  const handleCloseUserLogoModal = () => {
    setIsUserLogoModalOpen(false);
  };

  const handleOpenSettingsModal = () => setIsSettingModalOpen(true);
  const handleOpenLogoutModal = () => setIsLogoutModalOpen(true);

  const handleCloseSettingsModal = () => setIsSettingModalOpen(false);
  const handleCloseLogoutModal = () => setIsLogoutModalOpen(false);

  const getUserInitial = () => {
    if (user && user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    if (user && user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return '?';
  };

  return (
    <div className={css.wrapper}>
      <div className={css.point}>
        <p className={css.user}>
          {user && user.name ? user.name.substring(0, 10) : 'User'}
        </p>
        <div className={css.logobox}>
          <button
            width={'28px'}
            height={'28px'}
            onClick={handleUserLogoClick}
            ref={buttonRef}
            className={css.userLogoButton}
          >
            {user && user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={`${user.name}'s avatar`}
                className={css.avatar}
                width={'28px'}
                height={'28px'}
              />
            ) : (
              <span className={css.userInitial}>{getUserInitial()}</span>
            )}
          </button>

          <svg
            width={28}
            height={28}
            onClick={handleUserLogoClick}
            ref={buttonRef}
            className={css.icon}
          >
            <use href="/assets/images/icons.svg#icon-arrow-down" />
          </svg>
        </div>
      </div>

      <UserLogoModal
        isOpen={isUserLogoModalOpen}
        onClose={handleCloseUserLogoModal}
        onOpenSettings={handleOpenSettingsModal}
        onOpenLogout={handleOpenLogoutModal}
        anchorPosition={anchorPosition}
      />

      {isSettingModalOpen && (
        <SettingModal
          isOpen={isSettingModalOpen}
          onClose={handleCloseSettingsModal}
        />
      )}

      {isLogoutModalOpen && (
        <LogOutModal
          isOpen={isLogoutModalOpen}
          onClose={handleCloseLogoutModal}
        />
      )}
    </div>
  );
};

export default UserLogo;
