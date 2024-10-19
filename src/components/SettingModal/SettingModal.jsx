import { ErrorMessage, Field, Form, Formik } from 'formik';
// import { FiUpload } from 'react-icons/fi';

import styles from './SettingModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserData } from '../../redux/auth/authOperation.js';
import { useInfoValidationSchema } from '../../validation/userValidation.js';
import { selectCurrentUser } from '../../redux/auth/authSelectors.js';

function SettingModal() {
  const dispatch = useDispatch();
  const { name, email, gender } = useSelector(selectCurrentUser);

  const initialValues = {
    gender: gender || '',
    name: name || '',
    email: email || '',
    oldPassword: '',
    password: '',
  };

  const handleSubmit = value => {
    dispatch(
      changeUserData({
        name: value.name,
        gender: value.gender,
        oldPassword: value.oldPassword,
        password: value.password,
      })
    );
  };

  return (
    <div className={styles.modal}>
      <h1>Setting</h1>
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
              <ErrorMessage name="name" component="span" />
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
              <ErrorMessage name="email" component="span" />
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
                type="text"
                placeholder="Password"
                className={styles.input}
              ></Field>
              <ErrorMessage name="oldPassword" component="span" />
            </div>

            <label htmlFor="password" className={styles.labelField}>
              New Password:
            </label>
            <Field
              name="password"
              type="text"
              placeholder="Password"
              className={styles.input}
            ></Field>
            <ErrorMessage name="password" component="span" />

            <label htmlFor="confirmPassword" className={styles.labelField}>
              Repeat new password:
            </label>
            <Field
              name="confirmPassword"
              type="text"
              placeholder="Password"
              className={styles.input}
            ></Field>
            <ErrorMessage name="confirmPassword" component="span" />
          </div>

          <button type="submit" className={styles.button}>
            Save
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default SettingModal;
