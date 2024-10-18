import * as Yup from 'yup';

export const useInfoValidationSchema = Yup.object().shape({
  gender: Yup.string()
    .oneOf(['male', 'female'], 'The field must be either "male" or "female"')
    .required('This field is required'),

  name: Yup.string().max(32, 'The field must contain at most 32 characters'),

  email: Yup.string()
    .email('The field must contain a valid email')
    .required('This field is required'),

  oldPassword: Yup.string()
    .min(8, 'The field must contain at least 8 characters')
    .max(64, 'The field must contain at most 64 characters')
    .when(['password', 'confirmPassword'], {
      is: (password, confirmPassword) => password || confirmPassword,
      then: Yup.string().required('This field is required'),
    }),

  password: Yup.string()
    .min(8, 'The field must contain at least 8 characters')
    .max(64, 'The field must contain at most 64 characters')
    .when(['oldPassword', 'confirmPassword'], {
      is: (oldPassword, confirmPassword) => oldPassword || confirmPassword,
      then: Yup.string().required('This field is required'),
    }),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .when(['oldPassword', 'password'], {
      is: (oldPassword, password) => oldPassword || password,
      then: Yup.string().required('This field is required'),
    }),
});
