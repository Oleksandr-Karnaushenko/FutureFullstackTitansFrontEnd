import { useDispatch, useSelector } from 'react-redux';

import styles from './TestBtn.module.css';

import {
  changeUserAvatarAPI,
  changeUserDataAPI,
  editDailyNormAPI,
  fetchCurrentUserAPI,
  fetchUserDataAPI,
  logOutAPI,
  signInAPI,
  signUpAPI,
} from '../../redux/auth/authOperation.js';
import {
  selectIsLoggedIn,
  selectToken,
  selectUserId,
} from '../../redux/auth/authSelectors.js';
import {
  addWaterAPI,
  deleteWaterAPI,
  editWaterAPI,
  getCurrentDayInfoAPI,
  getCurrentMonthInfoAPI,
} from '../../redux/water/waterOperation.js';
import { useState } from 'react';
import DailyNormaModal from '../DailyNormaModal/DailyNormaModal.jsx';
import DailyNormaModalMD from '../DailyNormaModalMD/DailyNormaModalMD.jsx';

export const TestBtn = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  // const userId = '6712f7c63f6b0ede6444d149';
  const waterNorma = { dailyNorm: 2000 };
  const userNewData = { name: 'olololo' };
  const id = '6716cd7dca65090473295ace';

  const addWater = {
    date: '2024-10-20 19:20',
    waterVolume: 500,
  };
  const editWater = {
    date: '2024-10-21 17:20',
    waterVolume: 500,
  };
  const monthInfo = {
    year: 2024,
    month: 10,
  };

  const dispatch = useDispatch();

  const onClick = async () => {
    try {
      await dispatch(fetchCurrentUserAPI()).unwrap();
    } catch (error) {
      console.error('Something went wrong, please try again:', error);
    }
  };

  return (
    <div>
      <button onClick={onClick} className={styles.btn}>
        Test
      </button>
      <button onClick={handleOpenModal}>Edit</button>
      {isModalOpen && (
        <DailyNormaModalMD
          isOpen={handleOpenModal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
