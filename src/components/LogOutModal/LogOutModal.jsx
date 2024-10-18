import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import css from './LogOutModal.module.css';
import { logOutAPI } from '../../redux/auth/authOperation';

const LogOutModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.auth.isLogoutModalOpen);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(isOpen);

  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const handleLogOut = async () => {
    try {
      await dispatch(logOutAPI()).unwrap();
      closeLogoutModal();
    } catch (error) {
      console.error('Something went wrong, please try again:', error);
    }
  };
  useEffect(() => {
    setIsLogoutModalOpen(true);

    const handleBackdropClick = event => {
      if (event.target.classList.contains(css.modalOverlay)) {
        closeLogoutModal();
      }
    };

    const handleEscapePress = event => {
      if (event.key === 'Escape') {
        closeLogoutModal();
      }
    };
    document.addEventListener('click', handleBackdropClick);
    document.addEventListener('keydown', handleEscapePress);

    return () => {
      document.removeEventListener('click', handleBackdropClick);
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, [dispatch]);

  return (
    <div>
      {isLogoutModalOpen && (
        <div className={css.modalOverlay}>
          <div className={css.modal}>
            <div className={css.header}>
              <h1 className={css.title}>Log out</h1>
              <span className={css.close} onClick={closeLogoutModal}>
                <FaTimes />
              </span>
            </div>
            <h2>Do you really want to leave?</h2>
            <div className={css.buttonContainer}>
              <button className={css.cancelButton} onClick={closeLogoutModal}>
                Cancel
              </button>
              <button className={css.logoutButton} onClick={handleLogOut}>
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogOutModal;
