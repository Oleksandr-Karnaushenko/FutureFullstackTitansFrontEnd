import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { HiOutlineEyeSlash } from 'react-icons/hi2';
import { HiOutlineEye } from 'react-icons/hi2';

// import { FiUpload } from 'react-icons/fi';

import styles from './SettingModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserDataAPI } from '../../redux/auth/authOperation.js';
import { useInfoValidationSchema } from '../../validation/userValidation.js';
import { selectCurrentUser } from '../../redux/auth/authSelectors.js';

function SettingModal() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const user = useSelector(selectCurrentUser);
  console.log(user);

  const { name, gender, email } = user;

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
      const updatedData = {};

      if (values.name !== user.name) updatedData.name = values.name;
      if (values.gender !== user.gender) updatedData.gender = values.gender;
      if (values.email !== user.email) updatedData.email = values.email;

      if (values.oldPassword && values.password && values.confirmPassword) {
        if (values.password === values.confirmPassword) {
          updatedData.oldPassword = values.oldPassword;
          updatedData.password = values.password;
        } else {
          throw new Error('Passwords do not match');
        }
      }

      const userId = user._id;
      console.log(userId);
      console.log(updatedData);

      await dispatch(
        changeUserDataAPI({ userId, userNewData: updatedData })
      ).unwrap();
      resetForm({ values: { ...initialValues, ...updatedData } });
    } catch (error) {
      console.error('Error:', error);
      console.error('Backend response:', error.response?.data || error.message);
      //  toastError(error.response?.data || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Setting</h1>
        <button className={styles.buttonClose}>
          <IoCloseOutline
            name="icon-cross"
            width={24}
            height={24}
            color="#407BFF"
            className={styles.iconClose}
          />
        </button>
      </div>

      {/* <form>
        <label htmlFor="image">
          <FiUpload />
        </label>
        <input type="file" name="image" />
        <img src="" alt="" />
        <button type="submit">Upload a photo</button>
      </form> */}

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
                    <label className={styles.labelField}>
                      <Field
                        name="gender"
                        type="radio"
                        value="female"
                        className={styles.radioInput}
                      ></Field>{' '}
                      Woman
                    </label>
                    <label className={styles.labelField}>
                      <Field
                        name="gender"
                        type="radio"
                        value="male"
                        className={styles.radioInput}
                      ></Field>{' '}
                      Man
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
                  ></Field>
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
                  ></Field>
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
                        {field === 'confirmPassword' && 'Repeat new password:'}
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
  );
}

export default SettingModal;
