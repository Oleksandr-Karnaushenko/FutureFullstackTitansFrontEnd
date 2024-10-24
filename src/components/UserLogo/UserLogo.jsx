import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/auth/authSelectors";
import UserLogoModal from "../UserLogoModal/UserLogoModal";
import SettingModal from "../SettingModal/SettingModal";
import LogOutModal from "../LogOutModal/LogOutModal";
import css from "./UserLogo.module.css";

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
    setIsUserLogoModalOpen((prev) => !prev);
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
    return "?";
  };

  return (
    <div className={css.wrapper}>
      <div
        className={css.point}
        onClick={handleUserLogoClick}
        ref={buttonRef}
      >
        <p className={css.user}>{user && user.name ? user.name : "User"}</p>

        <button className={css.userLogoButton}>
          {user && user.avatarURL ? (
            <img
              src={user.avatarURL}
              alt={`${user.name}'s avatar`}
              className={css.avatar}
            />
          ) : (
            <span className={css.userInitial}>
              {getUserInitial()}
            </span>
          )}
        </button>

        <svg className={css.icon}>
          <use href="/src/assets/images/icons.svg#icon-arrow-down" />
        </svg>
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
