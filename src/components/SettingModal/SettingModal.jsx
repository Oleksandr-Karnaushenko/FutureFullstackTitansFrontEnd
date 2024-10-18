import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FiUpload } from 'react-icons/fi';

import style from './SettingModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../redux/auth/authSelectors.js';
import { changeUserData } from '../../redux/auth/authOperation.js';
import { useInfoValidationSchema } from '../../validation/userValidation.js';

function SettingModal() {
  const dispatch = useDispatch();
  const { name, email, gender } = useSelector(getCurrentUser);

  const initialValues = {
    gender,
    name,
    email,
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
    <div>
      <form>
        <label htmlFor="image">
          <FiUpload />
        </label>
        <input type="file" name="image" />
        <img src="" alt="" />
        <button type="submit">Upload a photo</button>
      </form>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={useInfoValidationSchema}
      >
        <Form className={style.form}>
          <div>
            <label htmlFor="gender">Your gender identity</label>
            <label>
              <Field name="gender" type="radio" value="female"></Field>Woman
            </label>
            <label>
              <Field name="gender" type="radio" value="male"></Field>Man
            </label>

            <label htmlFor="name">Your name</label>
            <Field name="name" type="text" placeholder="Name"></Field>
            <ErrorMessage name="name" component="span" />

            <label htmlFor="email">E-mail</label>
            <Field name="email" type="text" placeholder="Email"></Field>
            <ErrorMessage name="email" component="span" />
          </div>

          <div>
            <p>Password</p>

            <label htmlFor="oldPassword">Outdated password:</label>
            <Field
              name="oldPassword"
              type="text"
              placeholder="Password"
            ></Field>
            <ErrorMessage name="oldPassword" component="span" />

            <label htmlFor="password">New Password:</label>
            <Field name="password" type="text" placeholder="Password"></Field>
            <ErrorMessage name="password" component="span" />

            <label htmlFor="confirmPassword">Repeat new password:</label>
            <Field
              name="confirmPassword"
              type="text"
              placeholder="Password"
            ></Field>
            <ErrorMessage name="confirmPassword" component="span" />
          </div>

          <button type="submit">Save</button>
        </Form>
      </Formik>
    </div>
  );
}

export default SettingModal;
