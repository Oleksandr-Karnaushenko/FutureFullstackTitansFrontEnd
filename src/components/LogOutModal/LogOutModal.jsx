import { useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import css from './LogOutModal.module.css';
import { logOutAPI } from '../../redux/auth/authOperation';
import { Formik, Form } from 'formik';

const LogOutModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await dispatch(logOutAPI()).unwrap();
      onClose(); // закриваємо модальне вікно після успішного логауту
    } catch (error) {
      console.error('Something went wrong, please try again:', error);
    }
  };

  if (!isOpen) return null; // Якщо модальне вікно закрите не рендеримо його

  return (
    <div className={css.modalOverlay}>
      <div className={css.modal}>
        <div className={css.header}>
          <h1 className={css.title}>Log out</h1>
          <span className={css.close} onClick={onClose}>
            <FaTimes />
          </span>
        </div>
        <h2>Do you really want to leave?</h2>
        <div className={css.buttonContainer}>
          <Formik
            initialValues={{}}
            onSubmit={handleLogOut} // логаут якщо в нас виконується сабміт
          >
            {({ isSubmitting }) => (
              <Form>
                <button
                  type="button"
                  className={css.cancelButton}
                  onClick={onClose} //закривається  модальне вікно без логауту
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={css.logoutButton}
                  disabled={isSubmitting}
                >
                  Log out
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;