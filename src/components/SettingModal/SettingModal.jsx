import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './SettingModal.module.css';

import Loader from '../Loader/Loader.jsx';
import { IoCloseOutline } from 'react-icons/io5';
import { HiOutlineEyeSlash } from 'react-icons/hi2';
import { HiOutlineEye } from 'react-icons/hi2';

import { useDispatch, useSelector } from 'react-redux';
import { changeUserDataAPI } from '../../redux/auth/authOperation.js';
import { useInfoValidationSchema } from '../../validation/userValidation.js';
import {
  selectAuthIsRefreshing,
  selectCurrentUser,
} from '../../redux/auth/authSelectors.js';

function SettingModal({ isOpen, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const isRefreshing = useSelector(selectAuthIsRefreshing);

  const user = useSelector(selectCurrentUser);
  const { name, gender, email } = user;

  // це треба щоб було у загальному компоненті для модалок
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
  // до цього

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

  return isRefreshing ? (
    <Loader className={styles.loader} />
  ) : (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Setting</h2>
          <button className={styles.buttonClose} onClick={onClose}>
            <IoCloseOutline className={styles.iconClose} />
          </button>
        </div>

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
                      <label className={styles.labelGender}>
                        <Field
                          name="gender"
                          type="radio"
                          value="female"
                          className={styles.radioInput}
                        />
                        {''}
                        <span>Woman</span>
                      </label>

                      <label className={styles.labelGender}>
                        <Field
                          name="gender"
                          type="radio"
                          value="male"
                          className={styles.radioInput}
                        />
                        {''}
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

                <div className={styles.partWrapper}>
                  <label className={styles.labelTitle}>Password</label>
                  {['oldPassword', 'password', 'confirmPassword'].map(
                    (field, index) => (
                      <div className={styles.fieldWrapper} key={index}>
                        <label htmlFor={field} className={styles.labelField}>
                          {field === 'oldPassword' && 'Outdated password:'}
                          {field === 'password' && 'New Password:'}
                          {field === 'confirmPassword' &&
                            'Repeat new password:'}
                        </label>
                        <Field
                          name={field}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          className={`${styles.input} ${
                            errors[field] && touched[field]
                              ? styles.inputError
                              : ''
                          }`}
                        />
                        {showPassword ? (
                          <HiOutlineEyeSlash
                            className={styles.iconEye}
                            onClick={togglePasswordVisibility}
                          />
                        ) : (
                          <HiOutlineEye
                            className={styles.iconEye}
                            onClick={togglePasswordVisibility}
                          />
                        )}
                        <ErrorMessage
                          name={field}
                          component="span"
                          className={styles.errorMessage}
                        />
                      </div>
                    )
                  )}
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
    </div>
  );
}

export default SettingModal;
