import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
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
  const { avatarUrl, name } = user;
  const userInitial = name.charAt(0).toUpperCase();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = event => {
    const file = event.target.files[0];

    if (file && file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB.');
      return;
    }

    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error('Please select a file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('avatarUrl', selectedFile);
    console.log(formData.get('avatarUrl'));

    try {
      const userId = user._id;
      await dispatch(changeUserAvatarAPI({ userId, formData }));
      await dispatch(fetchUserDataAPI(userId));
      toast.success('Avatar uploaded successfully!');
    } catch {
      toast.error('Error during uploading new avatar.');
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
          <FiUpload className={styles.iconUpload} />
        </label>
        <input
          id="fileInput"
          name="avatar"
          type="file"
          className={styles.inputAvatar}
          onChange={handleFileChange}
        />

        <button
          type="button"
          onClick={handleSubmit}
          className={styles.uploadBtn}
        >
          Upload a photo
        </button>
      </div>
    </div>
  );
}

export default UploadAvatar;
