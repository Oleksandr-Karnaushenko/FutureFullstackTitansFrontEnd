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
import { addWaterAPI } from '../../redux/water/waterOperation.js';

export const TestBtn = () => {
  const token = useSelector(selectToken);
  //   const data = useSelector(selectUserId);
  const userId = '6712f7c63f6b0ede6444d149';
  const waterNorma = { dailyNorm: 1000 };
  const userNewData = { name: 'olololo' };

  const addWater = {};

  const dispatch = useDispatch();

  const onClick = async () => {
    console.log('reqwery data');
    console.log(userId);
    try {
      await dispatch(addWaterAPI({ userId, token, waterNorma })).unwrap();
    } catch (error) {
      console.error('Something went wrong, please try again:', error);
    }
  };

  return (
    <button onClick={onClick} className={styles.btn}>
      Test
    </button>
  );
};
