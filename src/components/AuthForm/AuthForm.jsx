import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { signInAPI, signUpAPI } from '../../redux/auth/authOperation';
import styles from './AuthForm.module.css';

export default function AuthForm({ isSignup }) {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Required field'),
    password: Yup.string()
      .min(8, 'Minimum 8 characters')
      .max(64, 'Password must be less than 64 characters')
      .required('Required field'),
  });

  const initialValues = { email: '', password: '' };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isSignup) {
        await dispatch(signUpAPI(values)).unwrap();
        toast.success('Successful registration!');
      } else {
        await dispatch(signInAPI(values)).unwrap();
        toast.success('Successful login!');
      }
    } catch {
      toast.error('Error during registration/login');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.inputWrapper}>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.inputWrapper}>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className={styles.input}
            />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.error}
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSignup ? 'Sign up' : 'Sign in'}
          </button>

          <div className={styles.links}>
            {!isSignup && (
              <>
                <a href="/signup" className={styles.link}>
                  Sign Up
                </a>
                <a href="/forgot-password" className={styles.link}>
                  Forgot your password?
                </a>
              </>
            )}
            {isSignup && (
              <a href="/signin" className={styles.link}>
                Sign In
              </a>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
