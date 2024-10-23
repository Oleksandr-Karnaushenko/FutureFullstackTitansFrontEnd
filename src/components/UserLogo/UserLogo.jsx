import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/auth/authSelectors";
import { logOutAPI } from "../../redux/auth/authOperation";
import UserLogoutModal from "../UserLogoutModal/UserLogoutModal";
import SettingModal from "../SettingModal/SettingModal";
import UserLogoModal from "../UserLogoModal/UserLogoModal";

import css from "./UserLogo.module.css";

const UserLogo = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isUserLogoModalOpen, setIsUserLogoModalOpen] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState(null);
  const buttonRef = useRef(null);

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleConfirmLogout = () => {
    dispatch(logOutAPI());
    setIsLogoutModalOpen(false);
  };

  const handleCloseSettingModal = () => {
    setIsSettingModalOpen(false);
  };

  const handleUserLogoClick = (e) => {
    if (e.target.closest("svg")) {
      const button = buttonRef.current;
      if (button) {
        const rect = button.getBoundingClientRect();
        setAnchorPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        });
      }
      setIsUserLogoModalOpen(true);
    }
  };

  const handleCloseUserLogoModal = () => {
    setIsUserLogoModalOpen(false);
  };

  const getUserInitial = () => {
    if (user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "?";
  };

  return (
    <div className={css.wrapper}>
      <div className={css.point}>
        <p className={css.user} onClick={handleCloseUserLogoModal}>
          {user.name ? user.name : "User"}
        </p>
        <button
          ref={buttonRef}
          className={css.userLogoButton}
          onClick={handleUserLogoClick}
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`${user.name}'s avatar`}
              className={css.avatar}
            />
          ) : (
            <span className={css.userInitial}>
              {user.name ? user.name : getUserInitial()}
            </span>
          )}
        </button>
        <svg className={css.icon} onClick={handleUserLogoClick}>
          <use href="/src/assets/img/icons.svg#icon-arrow-down" />
        </svg>
      </div>

      <UserLogoutModal
        isOpen={isLogoutModalOpen}
        onClose={handleCloseLogoutModal}
        onLogout={handleConfirmLogout}
      />

      <SettingModal
        isOpen={isSettingModalOpen}
        onClose={handleCloseSettingModal}
      />

      {isUserLogoModalOpen && (
        <UserLogoModal
          isOpen={isUserLogoModalOpen}
          onClose={handleCloseUserLogoModal}
          anchorPosition={anchorPosition}
        />
      )}
    </div>
  );
};

export default UserLogo;
