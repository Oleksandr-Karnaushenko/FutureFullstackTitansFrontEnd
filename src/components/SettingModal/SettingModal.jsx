import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import styles from './SettingModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeUserDataAPI,
  fetchUserDataAPI,
} from '../../redux/auth/authOperation.js';
import { selectCurrentUser } from '../../redux/auth/authSelectors.js';
import Icon from '../Icon/Icon.jsx';

function SettingModal({ isOpen, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    dispatch(fetchUserDataAPI());
  }, [dispatch]);

  const user = useSelector(selectCurrentUser);
  const { name, gender, email } = user;

  const initialValues = {
    gender: gender || '',
    name: name || '',
    email: email || '',
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log(values);
      await dispatch(
        changeUserDataAPI({
          name: values.name,
          gender: values.gender,
        })
      ).unwrap();
      resetForm();
    } catch (error) {
      console.error('Backend response:', error.response?.data || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Якщо `isOpen` - false, модалка не рендериться
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Setting</h1>
        <button className={styles.buttonClose} onClick={onClose}>
          <Icon
            name="icon-cross"
            width={24}
            height={24}
            color="#407BFF"
            className={styles.iconClose}
          />
        </button>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.form}>
              <div className={styles.partWrapper}>
                <label htmlFor="gender" className={styles.labelTitle}>
                  Your gender identity
                </label>
                <div className={styles.genderWrapper}>
                  <label className={styles.labelField}>
                    <Field name="gender" type="radio" value="female"></Field>{' '}
                    Woman
                  </label>
                  <label className={styles.labelField}>
                    <Field name="gender" type="radio" value="male"></Field> Man
                  </label>
                </div>
              </div>

              <div className={styles.fieldWrapper}>
                <label htmlFor="name" className={styles.labelTitle}>
                  Your name
                </label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Name"
                  className={styles.input}
                ></Field>
                <ErrorMessage
                  name="name"
                  component="span"
                  className={`${styles.errorMessage} ${
                    errors.name && touched.name ? styles.inputError : ''
                  }`}
                />
              </div>

              <div className={styles.fieldWrapper}>
                <label htmlFor="email" className={styles.labelTitle}>
                  E-mail
                </label>
                <Field
                  name="email"
                  type="text"
                  placeholder="Email"
                  className={styles.input}
                ></Field>
                <ErrorMessage
                  name="email"
                  component="span"
                  className={`${styles.errorMessage} ${
                    errors.email && touched.email ? styles.inputError : ''
                  }`}
                />
              </div>
            </div>

            <div className={styles.partWrapper}>
              <label className={styles.labelTitle}>Password</label>

              <div className={styles.fieldWrapper}>
                <label htmlFor="oldPassword" className={styles.labelField}>
                  Outdated password:
                </label>
                <Field
                  name="oldPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className={styles.input}
                ></Field>
                <Icon
                  name={showPassword ? 'icon-close-eye' : 'icon-open-eye'}
                  width={16}
                  height={16}
                  color="#407BFF"
                  className={styles.iconEye}
                  onClick={togglePasswordVisibility}
                />
                <ErrorMessage
                  name="oldPassword"
                  component="span"
                  className={`${styles.errorMessage} ${
                    errors.oldPassword && touched.oldPassword
                      ? styles.inputError
                      : ''
                  }`}
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
                  className={styles.input}
                ></Field>
                <Icon
                  name={showPassword ? 'icon-close-eye' : 'icon-open-eye'}
                  width={16}
                  height={16}
                  color="#407BFF"
                  className={styles.iconEye}
                  onClick={togglePasswordVisibility}
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className={`${styles.errorMessage} ${
                    errors.password && touched.password ? styles.inputError : ''
                  }`}
                />
              </div>

              <div className={styles.fieldWrapper}>
                <label htmlFor="confirmPassword" className={styles.labelField}>
                  Repeat new password:
                </label>
                <Field
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className={styles.input}
                ></Field>
                <Icon
                  name={showPassword ? 'icon-close-eye' : 'icon-open-eye'}
                  width={16}
                  height={16}
                  color="#407BFF"
                  className={styles.iconEye}
                  onClick={togglePasswordVisibility}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="span"
                  className={`${styles.errorMessage} ${
                    errors.confirmPassword && touched.confirmPassword
                      ? styles.inputError
                      : ''
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              className={styles.button}
              disabled={isSubmitting}
            >
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SettingModal;
