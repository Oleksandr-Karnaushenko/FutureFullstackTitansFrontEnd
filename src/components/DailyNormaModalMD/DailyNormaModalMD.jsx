import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { editDailyNormAPI } from '../../redux/auth/authOperation';
import { toastSuccess, toastError } from '../../services/toastNotification'; // Імпорт нових функцій
import css from './DailyNormaModalMD.module.css';
import {
  selectUserId,
  selectNormWater,
  selectUserGender,
} from '../../redux/auth/authSelectors';
// import { ButtonBtn } from '../ButtonBtn/ButtonBtn';
import { IoCloseOutline } from 'react-icons/io5';

const DailyNormaModalMD = ({ closeModal }) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const dailyNorma = useSelector(selectNormWater);
  const gender = useSelector(selectUserGender);

  const initialValues = {
    gender: gender || 'female',
    weight: '', // Поле для ваги порожнє за замовчуванням
    activeTime: '', // Поле для активного часу порожнє за замовчуванням
    plannedIntake: dailyNorma ? dailyNorma / 1000 : '', // Поле для планованого вживання з даними з бази
  };

  // Схема валідації
  const validationSchema = Yup.object().shape({
    plannedIntake: Yup.number()
      .required('Field is required')
      .min(0, 'Value must be positive'),
    weight: Yup.number().min(0, 'Weight must be greater than 0'),
    activeTime: Yup.number().min(0, 'Time must be positive'),
  });

  const [calculatedWaterVolume, setCalculatedWaterVolume] = useState(0.0);

  // Функція для обчислення денної норми води
  const calculateDailyNorm = (gender, weight, activeTime) => {
    let V = 0;
    if (weight > 0) {
      if (gender === 'female') {
        V = weight * 0.03 + activeTime * 0.4;
      } else if (gender === 'male') {
        V = weight * 0.04 + activeTime * 0.6;
      }
    }
    setCalculatedWaterVolume(V);
  };

  // Відправка даних на сервер
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(
        editDailyNormAPI({
          userId,
          waterNorma: { dailyNorm: values.plannedIntake * 1000 },
        })
      ); // Передача userId і waterNorma
      toastSuccess('Daily norma saved successfully!');
      closeModal();
    } catch {
      toastError('Error saving daily norma!');
    } finally {
      setSubmitting(false); // Дозволяємо повторне відправлення форми
    }
  };

  return (
    <div className={css.container}>
      <div className={css.titleContainer}>
        <h2 className={css.title}>My daily norma</h2>
        <button className={css.buttonClose} onClick={closeModal}>
          <IoCloseOutline
            name="icon-cross"
            width={24}
            height={24}
            color="#407BFF"
            className={css.iconClose}
          />
        </button>
        {/* <ButtonBtn name="X" onClick={closeModal} clasNameBtn={css.closeButton} /> */}
      </div>
      <div className={css.formulaContainer}>
        <div className={css.formula}>
          <div>For woman: </div>
          <span>V=(M*0,03) + (T*0,4)</span>
        </div>
        <div className={css.formula}>
          <div>For man: </div>
          <span>V=(M*0,04) + (T*0,6)</span>
        </div>
      </div>
      <p className={css.formulaDescription}>
        <span>*</span> V is the volume of the water norm in liters per day, M is
        your body weight, T is the time of active sports, or another type of
        activity commensurate in terms of loads (in the absence of these, you
        must set 0)
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize // Щоб форма оновлювалась при зміні initialValues
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <h3 className={css.titleCalculate}>Calculate your rate</h3>
            <div className={css.calculation}>
              <div className={css.chooseGender}>
                <label className={css.radioButton}>
                  <Field
                    type="radio"
                    name="gender"
                    value="female"
                    checked={values.gender === 'female'}
                    onChange={e => {
                      setFieldValue('gender', e.target.value);
                      calculateDailyNorm(
                        e.target.value,
                        values.weight,
                        values.activeTime
                      );
                    }}
                  />
                  <div />
                  <span>For woman</span>
                </label>
                <label className={css.radioButton}>
                  <Field
                    type="radio"
                    name="gender"
                    value="male"
                    checked={values.gender === 'male'}
                    onChange={e => {
                      setFieldValue('gender', e.target.value);
                      calculateDailyNorm(
                        e.target.value,
                        values.weight,
                        values.activeTime
                      );
                    }}
                  />
                  <div />
                  <span>For man</span>
                </label>
              </div>
              <div className={css.chooseWeight}>
                <label htmlFor="weight">Your weight in kilograms:</label>
                <Field
                  name="weight"
                  type="number"
                  step="0.01"
                  placeholder="0"
                  min="0"
                  style={{
                    borderColor:
                      touched.weight && errors.weight
                        ? 'red'
                        : 'var(--secondary-blue)',
                  }}
                  onChange={e => {
                    const weight = Number(e.target.value);
                    setFieldValue('weight', weight);
                    calculateDailyNorm(
                      values.gender,
                      weight,
                      values.activeTime
                    );
                  }}
                />
                <ErrorMessage
                  name="weight"
                  component="div"
                  className={css.errorMessage}
                />
              </div>
              <div className={css.chooseActivTime}>
                <label htmlFor="activeTime">
                  The time of active participation in sports or other activities
                  with a high physical. Load in hours:
                </label>
                <Field
                  name="activeTime"
                  type="number"
                  step="0.01"
                  placeholder="0"
                  min="0"
                  style={{
                    borderColor:
                      touched.activeTime && errors.activeTime
                        ? 'red'
                        : 'var(--secondary-blue)',
                  }}
                  onChange={e => {
                    const activeTime = Number(e.target.value);
                    setFieldValue('activeTime', activeTime);
                    calculateDailyNorm(
                      values.gender,
                      values.weight,
                      activeTime
                    );
                  }}
                />
                <ErrorMessage
                  name="activeTime"
                  component="div"
                  className={css.errorMessage}
                />
              </div>
              <div className={css.calcResult}>
                <h4 className={css.titleResult}>
                  The required amount of water in liters per day:
                </h4>
                <p className={css.valueResult}>
                  {calculatedWaterVolume.toFixed(1)} L
                </p>
              </div>
            </div>
            <div className={css.plannedResult}>
              <label htmlFor="plannedIntake" className={css.writePlannedResult}>
                Write down how much water you will drink in liters:
              </label>
              <Field
                name="plannedIntake"
                type="number"
                step="0.01"
                placeholder="Enter planned intake"
                min="0"
                style={{
                  borderColor:
                    touched.plannedIntake && errors.plannedIntake
                      ? 'red'
                      : 'var(--secondary-blue)',
                }}
                value={values.plannedIntake} // Відображаємо значення з Redux
              />
              <ErrorMessage
                name="plannedIntake"
                component="div"
                className={css.errorMessage}
                style={{ marginTop: '-16px' }}
              />
            </div>
            <div className={css.buttonSaveContainer}>
              <button type="submit" className={css.saveButton}>
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DailyNormaModalMD;
