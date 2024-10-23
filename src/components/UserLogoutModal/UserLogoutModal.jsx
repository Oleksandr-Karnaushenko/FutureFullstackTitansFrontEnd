import css from "./UserLogoutModal.module.css";
import Modal from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { logOutAPI } from "../../redux/auth/authOperation";

export default function UserLogoutModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutAPI());
    onClose(); // Закриваємо модалку після логауту
  };

  return (
    <Modal modalTitle="Log out" isOpen={isOpen} onClose={onClose}>
      <div>
        <p className={css.text}>Do you really want to leave?</p>
        <div className={css.div}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </Modal>
  );
}
