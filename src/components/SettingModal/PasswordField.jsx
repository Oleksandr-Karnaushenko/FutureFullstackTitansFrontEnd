import { HiOutlineEyeSlash } from 'react-icons/hi2';
import { HiOutlineEye } from 'react-icons/hi2';
import { useState } from 'react';
import styles from './SettingModal.module.css';
import { ErrorMessage, Field } from 'formik';

function PasswordField({ errors, touched }) {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className={styles.partWrapper}>
      <label className={styles.labelTitle}>Password</label>

      <div className={styles.fieldWrapper}>
        <label htmlFor="oldPassword" className={styles.labelField}>
          Outdated password:
        </label>
        <Field
          name="oldPassword"
          type={showOldPassword ? 'text' : 'password'}
          placeholder="Password"
          className={`${styles.input} ${
            errors.oldPassword && touched.oldPassword ? styles.inputError : ''
          }`}
        />
        {showOldPassword ? (
          <HiOutlineEyeSlash
            className={styles.iconEye}
            onClick={() => setShowOldPassword(!showOldPassword)}
          />
        ) : (
          <HiOutlineEye
            className={styles.iconEye}
            onClick={() => setShowOldPassword(!showOldPassword)}
          />
        )}
        <ErrorMessage
          name="oldPassword"
          component="span"
          className={styles.errorMessage}
        />
      </div>

      <div className={styles.fieldWrapper}>
        <label htmlFor="password" className={styles.labelField}>
          New Password:
        </label>
        <Field
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          className={`${styles.input} ${
            errors.password && touched.password ? styles.inputError : ''
          }`}
        />
        {showPassword ? (
          <HiOutlineEyeSlash
            className={styles.iconEye}
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <HiOutlineEye
            className={styles.iconEye}
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
        <ErrorMessage
          name="password"
          component="span"
          className={styles.errorMessage}
        />
      </div>
      <div className={styles.fieldWrapper}>
        <label htmlFor="confirmPassword" className={styles.labelField}>
          Repeat new password:
        </label>
        <Field
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Password"
          className={`${styles.input} ${
            errors.confirmPassword && touched.confirmPassword
              ? styles.inputError
              : ''
          }`}
        />
        {showConfirmPassword ? (
          <HiOutlineEyeSlash
            className={styles.iconEye}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        ) : (
          <HiOutlineEye
            className={styles.iconEye}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        )}
        <ErrorMessage
          name="confirmPassword"
          component="span"
          className={styles.errorMessage}
        />
      </div>
    </div>
  );
}

export default PasswordField;
