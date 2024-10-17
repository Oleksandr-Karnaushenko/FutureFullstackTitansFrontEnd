import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FiUpload } from 'react-icons/fi';

import style from './SettingModal.module.css';

function SettingModal() {
  //   const userId = useSelector(state => state.auth.userId);

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
      // initialValues={initialValues}
      // onSubmit={handleSubmit}
      // validationSchema={validationSchema}
      >
        <Form className={style.form}>
          <div>
            <label htmlFor="gender">Your gender identity</label>
            <label>
              <Field name="gender" type="radio" valua="woman"></Field> Woman
            </label>
            <label>
              <Field name="gender" type="radio" valua="man"></Field>Man
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
            <label htmlFor="password">Outdated password:</label>
            <Field name="password" type="text" placeholder="Password"></Field>
            <ErrorMessage name="email" component="span" />
            <label htmlFor="password">New Password:</label>
            <Field name="password" type="text" placeholder="Password"></Field>
            <ErrorMessage name="password" component="span" />
            <label htmlFor="password">Repeat new password:</label>
            <Field name="password" type="text" placeholder="Password"></Field>
            <ErrorMessage name="password" component="span" />
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default SettingModal;
