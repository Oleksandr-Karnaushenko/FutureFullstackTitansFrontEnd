import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoCloseSharp } from 'react-icons/io5';

import css from './LogOutModal.module.css';

const LogOutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      dispatch(logout()); //???
      navigate('/');
    } catch (error) {
      console.error('Something went wrong:', error);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2 className={css.title}>Log out</h2>
        <IoCloseSharp size={12} onClick={onClose} className={css.closeIcon} />
      </div>
      <h2 className={css.title}>Log out</h2>
      <p className={css.text}>Do you really want to leave?</p>
      <div className={css.buttonContainer}>
        <button className={css.logButton} onClick={handleLogOut}>
          Log out
        </button>
        <button className={css.cancelButton} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};
export default LogOutModal;
