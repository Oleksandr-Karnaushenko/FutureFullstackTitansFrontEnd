import { useDispatch, useSelector } from 'react-redux';
import styles from './UploadAvatar.module.css';

import { selectCurrentUser } from '../../redux/auth/authSelectors.js';
import {
  changeUserAvatarAPI,
  fetchUserDataAPI,
} from '../../redux/auth/authOperation.js';
import { toast } from 'react-toastify';
import { FiUpload } from 'react-icons/fi';

function UploadAvatar() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const { avatarUrl, _id, name } = user;
  const userInitial = name.charAt(0).toUpperCase();

  const handleFileChange = async event => {
    const file = event.target.files[0];

    if (file && file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB.');
      return;
    }

    if (!file) {
      toast.error('Please choose a photo.');
    }

    if (file) {
      const formData = new FormData();
      formData.append('avatarUrl', file);

      try {
        const userId = _id;
        await dispatch(changeUserAvatarAPI({ userId, formData }));
        await dispatch(fetchUserDataAPI(userId));
      } catch {
        toast.error('Error during uploading new avatar.');
      }
    }
  };

  return (
    <div>
      <h3 className={styles.label}>Your photo</h3>
      <div className={styles.wrapper}>
        {avatarUrl ? (
          <img src={avatarUrl} alt="User avatar" className={styles.avatar} />
        ) : (
          <span className={styles.initial}>{userInitial}</span>
        )}

        <label htmlFor="fileInput" className={styles.iconLabel}>
          <FiUpload className={styles.iconUpload} />{' '}
          <span className={styles.upload}>Upload a photo</span>
        </label>
        <input
          id="fileInput"
          name="avatar"
          type="file"
          className={styles.inputAvatar}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}

export default UploadAvatar;
