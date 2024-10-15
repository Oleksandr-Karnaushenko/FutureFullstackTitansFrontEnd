import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodayWater } from '../../../redux/water/operations';
import { setChosenDate } from '../../../redux/water/slice'; 
import { formatISO } from 'date-fns';
import css from './Pagitation.module.css';
import { chosenDate as chosenDateSelector } from '../../../redux/water/selectors'; 

export const getISOStringDate = (date = new Date()) => {
  return formatISO(date, { representation: 'complete' });
};

const Pagitation = () => {
  const dispatch = useDispatch(); 
  const chosenDate = useSelector(chosenDateSelector); 

  
  const convertedChosenDate = useMemo(() => new Date(chosenDate), [chosenDate]);

  
  const isLastMonth = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return currentMonth === convertedChosenDate.getMonth() &&
           currentYear === convertedChosenDate.getFullYear();
  }, [convertedChosenDate]);

  

  const [chosenFullDate] = chosenDate.split('T');
    const [chosenYear, chosenMonth, chosenDay] = chosenFullDate.split('-');
    const date = `${chosenYear}-${chosenMonth}-${chosenDay}`;

  useEffect(() => {
    dispatch(getTodayWater(date)); 
    dispatch(setChosenDate(date));
  }, []); 

  const handlePrevMonth = () => {
    const prevMonthDate = new Date(convertedChosenDate);
    prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);

    dispatch(setChosenDate(getISOStringDate(prevMonthDate)));
  };

 const handleNextMonth = () => {
  const nextMonthDate = new Date(convertedChosenDate);
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

  const currentDate = new Date();
  
  const isFutureDate =
    nextMonthDate.getFullYear() > currentDate.getFullYear() ||
    (nextMonthDate.getFullYear() === currentDate.getFullYear() && nextMonthDate.getMonth() > currentDate.getMonth());

  if (!isFutureDate) {
    dispatch(setChosenDate(getISOStringDate(nextMonthDate)));
  } else {
    dispatch(setChosenDate(getISOStringDate(currentDate)));
  }
};

  const getMonthName = (month) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month];
  };

 return (
  <div className={css.dateWrapper}>
    <h1 className={css.title}>Month</h1>

    <div className={css.datePickContainer}>
       <button onClick={handlePrevMonth} type="button" className={css.buttonCalendar}>
        &lt;
      </button>

      <h3 className={css.dateTitle}>
        {getMonthName(convertedChosenDate.getMonth())}, {convertedChosenDate.getFullYear()}
      </h3>

      <button
        onClick={handleNextMonth}
        type="button"
        className={css.buttonCalendar}
        disabled={isLastMonth}
      >
        &gt;
      </button>
    </div>
  </div>
);
};

export default Pagitation;
