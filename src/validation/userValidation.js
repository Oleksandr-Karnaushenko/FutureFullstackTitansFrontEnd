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
    .test('required-if-password', 'This field is required', function (value) {
      const { password } = this.parent;
      return password ? !!value : true;
    }),

  password: Yup.string()
    .min(8, 'The field must contain at least 8 characters')
    .max(64, 'The field must contain at most 64 characters')
    .test(
      'required-if-old-password',
      'This field is required',
      function (value) {
        const { oldPassword } = this.parent;
        return oldPassword ? !!value : true;
      }
    ),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .test('required-if-password', 'This field is required', function (value) {
      const { password } = this.parent;
      return password ? !!value : true;
    }),
});
