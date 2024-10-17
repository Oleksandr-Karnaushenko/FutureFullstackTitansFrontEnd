import { useMemo, useState, useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import Select from 'react-select';
import { HiOutlinePlusSmall, HiOutlineMinusSmall } from 'react-icons/hi2';
import {
  getCurrentTime,
  countToFiveMinutes,
  TimeDropdown,
  differentStyles,
} from '../AmountOfWater/AmountOfWater';
import css from './TodayListModal.module.css';

export default function TodayListModal({ waterObj, onClose }) {
  const { waterVolume } = useMemo(() => {
    // тут треба буде з бекенду взяти дані
    return waterObj;
  }, [waterObj]);

  const initialTime = countToFiveMinutes(getCurrentTime());

  const [buttonBlockAmount, setButtonBlockAmount] = useState(waterVolume || 0);
  const [inputBlockAmount, setInputBlockAmount] = useState(waterVolume || 0);
  const [selectedTime, setSelectedTime] = useState(initialTime);

  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleTimeChange = selectedOption => {
    setSelectedTime(selectedOption.value);
  };

  const handleCloseModal = () => {
    onClose();
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleIncrement = () => {
    setButtonBlockAmount(prev => Math.min(5000, prev + 50));
  };

  const handleDecrement = () => {
    setButtonBlockAmount(prev => Math.max(50, prev - 50));
  };

  const handleInputChange = event => {
    const newValue = event.target.value.replace(/[^0-9]/g, '');
    const parsedValue = parseInt(newValue, 10);
    if (!isNaN(parsedValue) && parsedValue <= 5000) {
      setInputBlockAmount(parsedValue);
    } else {
      setInputBlockAmount(0);
    }
  };

  const handleBlur = () => {
    setButtonBlockAmount(inputBlockAmount);
  };

  const handleSubmit = () => {
    if (buttonBlockAmount < 50) {
      alert('Plese add more water.');
      return;
    }
    console.log('Saved:', {
      waterVolume: buttonBlockAmount,
      time: selectedTime,
    });
    handleCloseModal();
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <div className={css.titleContainer}>
          <h2 className={css.titletext}>Edit the entered amount of water</h2>
          <span className={css.closebtn} onClick={handleCloseModal}>
            <IoCloseOutline size="24" color="407BFF" />
          </span>
        </div>

        <div className={css.amountofwaterContainer}>
          <svg width={23} height={32}>
            <use href="icons.svg#icon-glass"></use>
          </svg>
          <p className={css.waterAmount}>{buttonBlockAmount} ml</p>
          <p className={css.time}>{selectedTime}</p>
        </div>

        <h3 className={css.subtitle}>Correct entered data:</h3>
        <p className={css.text}>Amount of water:</p>

        <div className={css.waterInputcontainer}>
          <button
            className={css.amountButton}
            type="button"
            onClick={handleDecrement}
            onBlur={handleBlur}
          >
            <HiOutlineMinusSmall size="24" color="407BFF" />
          </button>
          <p className={css.amountWaterIncome}>{buttonBlockAmount} ml</p>
          <button
            className={css.amountButton}
            type="button"
            onClick={handleIncrement}
            onBlur={handleBlur}
          >
            <HiOutlinePlusSmall size="24" color="407BFF" />
          </button>
        </div>

        <p className={css.text}>Recording time:</p>
        <Select
          styles={differentStyles}
          defaultValue={{ value: selectedTime, label: selectedTime }}
          onChange={handleTimeChange}
          options={TimeDropdown()}
        />

        <h3 className={css.subtitle}>Enter the value of the water used:</h3>
        <input
          className={css.waterInput}
          type="text"
          value={inputBlockAmount}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />

        <div className={css.footerContainer}>
          <p className={css.waterIncomeFooter}>{buttonBlockAmount} ml</p>
          <button
            className={css.saveButton}
            type="button"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
