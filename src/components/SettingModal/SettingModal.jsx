import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styles from './SettingModal.module.css';

import Loader from '../Loader/Loader.jsx';
import { IoCloseOutline } from 'react-icons/io5';

import { useDispatch, useSelector } from 'react-redux';
import { changeUserDataAPI } from '../../redux/auth/authOperation.js';
import { useInfoValidationSchema } from '../../validation/userValidation.js';
import {
  selectAuthIsRefreshing,
  selectCurrentUser,
} from '../../redux/auth/authSelectors.js';
import UploadAvatar from '../UploadAvatar/UploadAvatar.jsx';
import PasswordField from './PasswordField.jsx';

function SettingModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const isRefreshing = useSelector(selectAuthIsRefreshing);

  const user = useSelector(selectCurrentUser);
  const { name, gender, email } = user;


  const [isDragging, setIsDragging] = useState(false);

  const handleBackdropClick = (event) => {
    if (!isDragging && event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  


  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const initialValues = {
    gender: gender || 'female',
    name: name || '',
    email: email || '',
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const userNewData = {};

      if (values.name !== user.name) userNewData.name = values.name;
      if (values.gender !== user.gender) userNewData.gender = values.gender;
      if (values.email !== user.email) userNewData.email = values.email;

      if (values.oldPassword && values.password && values.confirmPassword) {
        if (values.password === values.confirmPassword) {
          userNewData.oldPassword = values.oldPassword;
          userNewData.password = values.password;
        } else {
          throw new Error('Passwords do not match');
        }
      }

      const userId = user._id;
      await dispatch(changeUserDataAPI({ userId, userNewData })).unwrap();
      resetForm({ values: { ...initialValues, ...userNewData } });
      onClose();
    } catch {
      toast.error('Error during saving new data.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
     className={styles.modalOverlay}
     onClick={handleBackdropClick}
  
    >
      {isRefreshing ? (
        <Loader className={styles.loader} />
      ) : (
        <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className={styles.modal} 
        onClick={e => e.stopPropagation()}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>Setting</h2>
            <button className={styles.buttonClose} onClick={onClose}>
              <IoCloseOutline className={styles.iconClose} />
            </button>
          </div>

          <UploadAvatar />

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={useInfoValidationSchema}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className={styles.form}>
                <div className={styles.wrapper}>
                  <div className={styles.formWrapper}>
                    <div className={styles.partWrapper}>
                      <label htmlFor="gender" className={styles.labelTitle}>
                        Your gender identity
                      </label>

                      <div className={styles.genderWrapper}>
                        <label className={styles.radioButton}>
                          <Field
                            name="gender"
                            type="radio"
                            value="female"
                            className={styles.radioInput}
                          />
                          <div />
                          <span>Woman</span>
                        </label>

                        <label className={styles.radioButton}>
                          <Field
                            name="gender"
                            type="radio"
                            value="male"
                            className={styles.radioInput}
                          />
                          <div />
                          <span>Man</span>
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
                        className={`${styles.input} ${
                          errors.name && touched.name ? styles.inputError : ''
                        }`}
                      />
                      <ErrorMessage
                        name="name"
                        component="span"
                        className={styles.errorMessage}
                      />
                    </div>
                    <div className={styles.fieldWrapper}>
                      <label htmlFor="email" className={styles.labelTitle}>
                        E-mail
                      </label>
                      <Field
                        disabled
                        name="email"
                        type="text"
                        placeholder="Email"
                        className={`${styles.input} ${
                          errors.email && touched.email ? styles.inputError : ''
                        }`}
                      />
                      <ErrorMessage
                        name="email"
                        component="span"
                        className={styles.errorMessage}
                      />
                    </div>
                  </div>

                  <PasswordField errors={errors} touched={touched} />
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
      )}
    </div>
  );
}

export default SettingModal;
