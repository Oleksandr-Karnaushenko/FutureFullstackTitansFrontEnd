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

import { selectWaterError } from '../../redux/water/waterSelectors';

export default function TodayListModal({
  waterObj,
  onClose,
  className,
  onMouseUp,
  onMouseDown,
}) {
  const dispatch = useDispatch();
  const error = useSelector(selectWaterError);

  const { waterVolume, time } = useMemo(() => {
    return waterObj;
  }, [waterObj]);

  const initialTime = countToFiveMinutes(getCurrentTime());

  const formik = useFormik({
    initialValues: {
      oldWaterVolume: waterVolume,
      oldselectedTime: time,
      waterVolume: waterVolume || 0,
      selectedTime: initialTime,
    },
    onSubmit: values => {
      if (values.waterVolume < 50) {
        alert('Please add more water.');
        return;
      }

      const date = new Date();

      const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${
        values.selectedTime
      }:00.000Z`;

      dispatch(
        editWaterAPI({
          id: waterObj._id,
          editWater: {
            date: dateString,
            waterVolume: values.waterVolume,
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

  return (
    <div
      className={`${css.modal} ${className}`}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onClick={event => event.stopPropagation()} // предотвращаем всплытие
    >
      <div className={css.titleContainer}>
        <h2 className={css.titletext}>Edit the entered amount of water</h2>

        <span className={css.closebtn} onClick={onClose}>
          <IoCloseOutline size="24" color="407BFF" />
        </span>
      </div>
      {error && <p className={css.error}>{error}</p>}{' '}
      {/* Показуємо повідомлення про помилку */}
      {formik.values.waterVolume === 0 ? (
        <p className={css.noNotes}>No notes yet</p>
      ) : (
        <div className={css.amountofwaterContainer}>
          <svg width={23} height={32}>
            {/* <use href="icons.svg#icon-glass"></use> */}
            <use href="/assets/images/icons.svg#icon-glass"></use>
          </svg>
          <p className={css.waterAmount}>{formik.values.oldWaterVolume} ml</p>
          <p className={css.time}>{formik.values.oldselectedTime}</p>
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
        <p className={css.amountWaterIncome}>{formik.values.waterVolume} ml</p>
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
        className={css.select}
        styles={differentStyles}
        defaultValue={{
          value: formik.values.oldselectedTime,
          label: formik.values.oldselectedTime,
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
        <p className={css.waterIncomeFooter}>{formik.values.waterVolume} ml</p>
        <button
          className={css.saveButton}
          type="button"
          onClick={formik.handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
}
