import * as Yup from 'yup';

export const useInfoValidationSchema = Yup.object()
  .shape({
    gender: Yup.string()
      .oneOf(['male', 'female'], 'The field must be either "male" or "female"')
      .required('This field is required'),

    name: Yup.string()
      .max(32, 'The field must contain at most 32 characters')
      .required('Name is required'),

    email: Yup.string()
      .email('The field must contain a valid email')
      .required('This field is required'),

    oldPassword: Yup.string()
      .min(8, 'The field must contain at least 8 characters')
      .max(64, 'The field must contain at most 64 characters'),

    password: Yup.string()
      .min(8, 'The field must contain at least 8 characters')
      .max(64, 'The field must contain at most 64 characters'),

    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
  })
  .test('passwords-required', null, function (values) {
    const { oldPassword, password, confirmPassword } = values;

    if (
      (oldPassword || password || confirmPassword) &&
      (!oldPassword || !password || !confirmPassword)
    ) {
      return this.createError({
        path: 'oldPassword',
        message: 'All password fields must be filled if any are filled',
      });
    }
    return true;
  });
