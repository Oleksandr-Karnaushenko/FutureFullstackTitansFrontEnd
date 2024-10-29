import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import css from './LogOutModal.module.css';
import { logOutAPI } from '../../redux/auth/authOperation';
import { Formik, Form } from 'formik';
import { useEffect } from 'react';

const LogOutModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    // Удаляем обработчик при размонтировании компонента или когда модалка закрыта
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleLogOut = async () => {
    
    try {
      await dispatch(logOutAPI()).unwrap();
      navigate('/welcome');
      onClose();
    } catch (error) {
      console.error('Something went wrong, please try again:', error);
    }
  };

  if (!isOpen) return null;

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
        <Formik initialValues={{}} onSubmit={handleLogOut}>
          {({ isSubmitting }) => (
            <Form className={css.buttonContainer}>
              <button
                type="button"
                className={css.cancelButton}
                onClick={onClose}
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
  );
};

export default LogOutModal;
