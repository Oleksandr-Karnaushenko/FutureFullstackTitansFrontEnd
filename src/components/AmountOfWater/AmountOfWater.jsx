import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Select from 'react-select';
import { IoCloseOutline } from 'react-icons/io5';
import { HiOutlinePlusSmall, HiOutlineMinusSmall } from 'react-icons/hi2';
import css from './AmountOfWater.module.css';

export const differentStyles = {
  control: provided => ({
    ...provided,
    border: '1px solid #D7E3FF',
    borderRadius: '6px',
    height: '44px',
    marginBottom: '24px',
  }),
  menu: provided => ({
    ...provided,
    scrollBehavior: 'smooth',
    border: '1px solid #D7E3FF',
    borderRadius: '6px',
  }),
  option: (provided, { isSelected }) => ({
    ...provided,
    background: isSelected ? '#D7E3FF' : '#ffffff',
    color: '#407BFF',
  }),
  singleValue: provided => ({
    ...provided,
    color: '#407BFF',
  }),
};

// Форматування поточного часу
export const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Округлення часу до найближчих 5 хвилин
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

// Генерація варіантів часу з кроком у 5 хвилин
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

export default function AmountOfWater({ onClose }) {
  const [buttonBlockAmount, setButtonBlockAmount] = useState(50);
  const [inputBlockAmount, setInputBlockAmount] = useState(50);
  const [currentAmount, setCurrentAmount] = useState(50);
  const [currentTime, setCurrentTime] = useState(
    countToFiveMinutes(getCurrentTime())
  );

  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  // Закриття модального вікна
  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function handleTimeChange(event) {
    setCurrentTime(event.value);
  }

  function addMilliliters(amount = 50) {
    setButtonBlockAmount(Math.min(5000, buttonBlockAmount + amount));
  }

  function subtractMilliliters(amount = 50) {
    setButtonBlockAmount(Math.max(50, buttonBlockAmount - amount));
  }

  function sendWaterData() {
    if (currentAmount < 50) {
      toast.error(
        'Please enter the amount of water used. Amount should be more than 50 ml.'
      );
      return;
    }
    // Записати дані на бекенд
  }

  useEffect(() => {
    setCurrentAmount(buttonBlockAmount);
  }, [buttonBlockAmount]);

  useEffect(() => {
    setCurrentAmount(inputBlockAmount);
  }, [inputBlockAmount]);

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <div className={css.titleContainer}>
          <h2 className={css.titleText}>Add water</h2>
          <button className={css.closebtn} onClick={onClose}>
            <IoCloseOutline size="24" color="407BFF" />
          </button>
        </div>

        <h3 className={css.subtitle}>Choose a value:</h3>
        <p className={css.text}>Amount of water:</p>
        <div className={css.waterInputContainer}>
          <button
            className={css.amountButton}
            type="button"
            onClick={() => subtractMilliliters()}
          >
            <HiOutlineMinusSmall size="24" color="407BFF" />
          </button>
          <p className={css.amountWaterIncome}>{buttonBlockAmount} ml</p>
          <button
            className={css.amountButton}
            type="button"
            onClick={() => addMilliliters()}
          >
            <HiOutlinePlusSmall size="24" color="407BFF" />
          </button>
        </div>

        <p className={css.text}>Recording time:</p>
        <Select
          styles={differentStyles}
          defaultValue={{ value: currentTime, label: currentTime }}
          onChange={handleTimeChange}
          options={TimeDropdown()}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
        />

        <h3 className={css.subtitle}>Enter the value of the water used:</h3>
        <input
          className={css.waterAmount}
          type="text"
          value={inputBlockAmount}
          onChange={event => {
            const newValue = event.target.value.replace(/[^0-9]/g, '');
            if (newValue === '') {
              setInputBlockAmount(0);
            } else {
              const parsedValue = parseInt(newValue);
              if (!isNaN(parsedValue) && parsedValue <= 5000) {
                setInputBlockAmount(parsedValue);
              }
            }
          }}
          onBlur={() => setButtonBlockAmount(inputBlockAmount)}
        />

        <div className={css.footerContainer}>
          <p className={css.incomeFooter}>{currentAmount} ml</p>
          <button
            className={css.saveButton}
            type="button"
            onClick={sendWaterData}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
