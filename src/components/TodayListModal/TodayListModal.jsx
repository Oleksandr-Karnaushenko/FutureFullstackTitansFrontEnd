import { useMemo, useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import Select from 'react-select';
import { HiOutlinePlusSmall, HiOutlineMinusSmall } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { editWaterAPI } from '../../redux/water/waterOperation';
import {
  getCurrentTime,
  countToFiveMinutes,
  TimeDropdown,
  differentStyles,
} from '../AmountOfWater/AmountOfWater';
import css from './TodayListModal.module.css';
import {
  selectWaterIsRefreshing,
  selectWaterError,
} from '../../redux/water/waterSlice';

export default function TodayListModal({ waterObj, onClose }) {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectWaterIsRefreshing);
  const error = useSelector(selectWaterError);

  const { waterVolume } = useMemo(() => {
    return waterObj;
  }, [waterObj]);

  const initialTime = countToFiveMinutes(getCurrentTime());

  const formik = useFormik({
    initialValues: {
      waterVolume: waterVolume || 0,
      selectedTime: initialTime,
    },
    onSubmit: values => {
      if (values.waterVolume < 50) {
        alert('Please add more water.');
        return;
      }

      dispatch(
        editWaterAPI({
          id: waterObj.id,
          editWater: {
            time: values.selectedTime,
            ml: values.waterVolume,
          },
        })
      );

      onClose(); // Закриття модалки
    },
  });

  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <div className={css.titleContainer}>
          <h2 className={css.titletext}>Edit the entered amount of water</h2>
          <span className={css.closebtn} onClick={onClose}>
            <IoCloseOutline size="24" color="407BFF" />
          </span>
        </div>
        {isRefreshing && <p>Loading...</p>}{' '}
        {/* Показуємо спінер при завантаженні */}
        {error && <p className={css.error}>{error}</p>}{' '}
        {/* Показуємо повідомлення про помилку */}
        {formik.values.waterVolume === 0 ? (
          <p className={css.noNotes}>No notes yet</p>
        ) : (
          <div className={css.amountofwaterContainer}>
            <svg width={23} height={32}>
              <use href="icons.svg#icon-glass"></use>
            </svg>
            <p className={css.waterAmount}>{formik.values.waterVolume} ml</p>
            <p className={css.time}>{formik.values.selectedTime}</p>
          </div>
        )}
        <h3 className={css.subtitle}>Correct entered data:</h3>
        <p className={css.text}>Amount of water:</p>
        <div className={css.waterInputcontainer}>
          <button
            className={css.amountButton}
            type="button"
            onClick={() =>
              formik.setFieldValue(
                'waterVolume',
                Math.max(50, formik.values.waterVolume - 50)
              )
            }
          >
            <HiOutlineMinusSmall size="24" color="407BFF" />
          </button>
          <p className={css.amountWaterIncome}>
            {formik.values.waterVolume} ml
          </p>
          <button
            className={css.amountButton}
            type="button"
            onClick={() =>
              formik.setFieldValue(
                'waterVolume',
                Math.min(5000, formik.values.waterVolume + 50)
              )
            }
          >
            <HiOutlinePlusSmall size="24" color="407BFF" />
          </button>
        </div>
        <p className={css.text}>Recording time:</p>
        <Select
          styles={differentStyles}
          defaultValue={{
            value: formik.values.selectedTime,
            label: formik.values.selectedTime,
          }}
          onChange={selectedOption =>
            formik.setFieldValue('selectedTime', selectedOption.value)
          }
          options={TimeDropdown()}
        />
        <h3 className={css.subtitle}>Enter the value of the water used:</h3>
        <input
          className={css.waterInput}
          type="text"
          value={formik.values.waterVolume}
          onChange={event => {
            const newValue = event.target.value.replace(/[^0-9]/g, '');
            formik.setFieldValue(
              'waterVolume',
              newValue ? Math.min(5000, parseInt(newValue)) : 0
            );
          }}
        />
        <div className={css.footerContainer}>
          <p className={css.waterIncomeFooter}>
            {formik.values.waterVolume} ml
          </p>
          <button
            className={css.saveButton}
            type="button"
            onClick={formik.handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
