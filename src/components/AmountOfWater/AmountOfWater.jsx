import { toast } from 'react-hot-toast';
import Select from 'react-select';
import { IoCloseOutline } from 'react-icons/io5';
import { HiOutlinePlusSmall, HiOutlineMinusSmall } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
// import { addWaterThunk } from '../../redux/water/waterOperation';
import { addWaterAPI } from '../../redux/water/waterOperation';
import css from './AmountOfWater.module.css';

export const differentStyles = {
  control: provided => ({
    ...provided,
    // border: '1px solid #D7E3FF',
   border: '1px solid var( --secondary-blue)',
    borderRadius: '6px',
    height: '44px',
    marginBottom: '24px',
    backgroundColor: "var(--background)"
  }),
  menu: provided => ({
    ...provided,
    scrollBehavior: 'smooth',
    // border: '1px solid #D7E3FF',
    border: "1px solid var( --secondary-blue)",
    borderRadius: '6px',
    backgroundColor: "var(--background)"
  }),
  option: (provided, { isSelected }) => ({
    ...provided,
    // background: isSelected ? '#D7E3FF' : '#ffffff',
    color: '#407BFF',
      backgroundColor: "var(--background)"
  }),
  singleValue: provided => ({
    ...provided,
    color: '#407BFF',
  }),
};

export const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const countToFiveMinutes = time => {
  let [hours, minutes] = time.split(':').map(Number);
  minutes = Math.round(minutes / 5) * 5;
  if (minutes === 60) {
    minutes = 0;
    hours = (hours + 1) % 24;
  }
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0'
  )}`;
};

export const TimeDropdown = () => {
  const options = [];
  for (let hours = 0; hours < 24; hours++) {
    for (let minutes = 0; minutes < 60; minutes += 5) {
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`;
      options.push({ value: timeString, label: timeString });
    }
  }
  return options;
};

export default function AmountOfWater({ closeModal }) {
  const dispatch = useDispatch();

  const initialValues = {
    buttonBlockAmount: 50,
    currentTime: countToFiveMinutes(getCurrentTime()),
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (values.buttonBlockAmount < 50) {
      toast.error(
        'Please enter the amount of water used. Amount should be more than 50 ml.'
      );
      setSubmitting(false);
      return;
    }

    const date = new Date();

    const dateString = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}T${values.currentTime}:00.000Z`;
    dispatch(
      addWaterAPI({
        waterVolume: values.buttonBlockAmount,
        date: dateString,
      })
    );
    setSubmitting(false);
    closeModal();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form>
          <div className={css.modal} onClick={e => e.stopPropagation()}>
            <div className={css.titleContainer}>
              <h2 className={css.titleText}>Add water</h2>
              <button
                className={css.closebtn}
                type="button"
                onClick={closeModal}
              >
                <IoCloseOutline size="24" color="407BFF" />
              </button>
            </div>

            <h3 className={css.subtitle}>Choose a value:</h3>
            <p className={css.text}>Amount of water:</p>
            <div className={css.waterInputContainer}>
              <button
                type="button"
                className={css.amountButton}
                onClick={() =>
                  setFieldValue(
                    'buttonBlockAmount',
                    Math.max(50, values.buttonBlockAmount - 50)
                  )
                }
              >
                <HiOutlineMinusSmall size="24" color="407BFF" />
              </button>
              <p className={css.amountWaterIncome}>
                {values.buttonBlockAmount} ml
              </p>
              <button
                type="button"
                className={css.amountButton}
                onClick={() =>
                  setFieldValue(
                    'buttonBlockAmount',
                    Math.min(5000, values.buttonBlockAmount + 50)
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
                value: values.currentTime,
                label: values.currentTime,
              }}
              onChange={option => setFieldValue('currentTime', option.value)}
              options={TimeDropdown()}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
            />

            <h3 className={css.subtitle}>Enter the value of the water used:</h3>
            <Field
              className={css.waterAmount}
              type="text"
              name="buttonBlockAmount"
              onChange={event => {
                const newValue = event.target.value.replace(/[^0-9]/g, '');
                setFieldValue(
                  'buttonBlockAmount',
                  newValue === '' ? 0 : Math.min(5000, parseInt(newValue))
                );
              }}
              onBlur={() =>
                setFieldValue('buttonBlockAmount', values.buttonBlockAmount)
              }
            />

            <div className={css.footerContainer}>
              <p className={css.incomeFooter}>{values.buttonBlockAmount} ml</p>
              <button className={css.saveButton} type="submit">
                Save
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
