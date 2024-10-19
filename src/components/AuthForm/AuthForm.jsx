import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { signInAPI, signUpAPI } from '../../redux/auth/authOperation';
import { useState } from 'react';
import styles from './AuthForm.module.css';

export default function AuthForm({ isSignup }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Required field'),
    password: Yup.string()
      .min(8, 'Minimum 8 characters')
      .max(64, 'Password must be less than 64 characters')
      .required('Required field'),
    confirmPassword: isSignup
      ? Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Required field')
      : Yup.string().nullable(),
  });

  const initialValues = { email: '', password: '', confirmPassword: '' };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { email, password } = values;

      if (isSignup) {
        await dispatch(signUpAPI({ email, password })).unwrap();
        toast.success('Successful registration!');
      } else {
        await dispatch(signInAPI({ email, password })).unwrap();
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
      {({ errors, touched, isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.inputWrapper}>
            <label htmlFor="email" className={styles.label}>
              Enter your email
            </label>
            <Field
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              className={`${styles.input} ${
                errors.email && touched.email ? styles.errorInput : ''
              }`}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.errorMessage}
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="password" className={styles.label}>
              Enter your password
            </label>
            <div className={styles.passwordWrapper}>
              <Field
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className={`${styles.input} ${
                  errors.password && touched.password ? styles.errorInput : ''
                }`}
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className={styles.errorMessage}
            />
          </div>

          {isSignup && (
            <div className={styles.inputWrapper}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Repeat your password
              </label>
              <div className={styles.passwordWrapper}>
                <Field
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className={`${styles.input} ${
                    errors.confirmPassword && touched.confirmPassword
                      ? styles.errorInput
                      : ''
                  }`}
                />
                <span
                  className={styles.eyeIcon}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </span>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={styles.errorMessage}
              />
            </div>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </button>

          <div className={styles.links}>
            {isSignup ? (
              <a href="/signin" className={styles.link}>
                Sign In
              </a>
            ) : (
              <a href="/signup" className={styles.link}>
                Sign Up
              </a>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
