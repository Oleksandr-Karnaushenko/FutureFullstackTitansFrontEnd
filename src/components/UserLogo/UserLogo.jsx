import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/auth/authSelectors";
import UserLogoModal from "../UserLogoModal/UserLogoModal";
import SettingModal from "../SettingModal/SettingModal";
import LogOutModal from "../LogOutModal/LogOutModal";
import css from "./UserLogo.module.css";

const UserLogo = () => {
  // Отримуємо дані поточного користувача зі стору
  const user = useSelector(selectCurrentUser);

  // Стани для управління модалками
  const [isUserLogoModalOpen, setIsUserLogoModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState(null);
  const buttonRef = useRef(null);

  // Функція для відкриття модалки
  const handleUserLogoClick = () => {
    const button = buttonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      setAnchorPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setIsUserLogoModalOpen(true); // Відкриваємо модалку при натисканні
  };

  // Закриваємо модалку UserLogoModal
  const handleCloseUserLogoModal = () => {
    setIsUserLogoModalOpen(false);
  };

  // Відкриваємо модалки налаштувань та логауту
  const handleOpenSettingsModal = () => setIsSettingModalOpen(true);
  const handleOpenLogoutModal = () => setIsLogoutModalOpen(true);

  // Закриття модалок
  const handleCloseSettingsModal = () => setIsSettingModalOpen(false);
  const handleCloseLogoutModal = () => setIsLogoutModalOpen(false);

  // Функція для отримання першої літери імені або email
  const getUserInitial = () => {
    if (user && user.name) {
      return user.name.charAt(0).toUpperCase(); // Повертаємо першу літеру імені
    }
    if (user && user.email) {
      return user.email.charAt(0).toUpperCase(); // Якщо немає імені, повертаємо першу літеру email
    }
    return "?"; // Якщо дані відсутні
  };

  return (
    <div className={css.wrapper}>
      <div
        className={css.point}
        onClick={handleUserLogoClick} // Відкриваємо модалку по кліку на весь елемент
        ref={buttonRef}
      >
        {/* Відображення імені користувача або значення "User" */}
        <p className={css.user}>{user && user.name ? user.name : "User"}</p>

        {/* Кнопка з аватаром або ініціалом */}
        <button className={css.userLogoButton}>
          {user && user.avatarURL ? (
            <img
              src={user.avatarURL}
              alt={`${user.name}'s avatar`}
              className={css.avatar}
            />
          ) : (
            <span className={css.userInitial}>
              {getUserInitial()} {/* Відображаємо ініціал користувача */}
            </span>
          )}
        </button>

        {/* Іконка стрілки */}
        <svg className={css.icon}>
          <use href="/src/assets/img/icons.svg#icon-arrow-down" />
        </svg>
      </div>

      {/* Модалка UserLogo */}
      <UserLogoModal
        isOpen={isUserLogoModalOpen}
        onClose={handleCloseUserLogoModal}
        onOpenSettings={handleOpenSettingsModal}
        onOpenLogout={handleOpenLogoutModal}
        anchorPosition={anchorPosition}
      />

      {/* Модалка налаштувань */}
      {isSettingModalOpen && (
        <SettingModal
          isOpen={isSettingModalOpen}
          onClose={handleCloseSettingsModal}
        />
      )}

      {/* Модалка логауту */}
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
