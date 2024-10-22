import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentMonthInfoAPI } from '../../redux/water/waterOperation.js';
import { selectMonthInfo } from '../../redux/water/waterSelectors.js';
import css from './MonthStatsTable.module.css';

export default function MonthStatsTable() {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const dispatch = useDispatch();

  const monthInfo = useSelector(selectMonthInfo);

  useEffect(() => {
    dispatch(
      getCurrentMonthInfoAPI({ month: selectedMonth + 1, year: selectedYear })
    );
  }, [dispatch, selectedMonth, selectedYear]);

  const handleMonthChange = direction => {
    const currentDate = new Date(selectedYear, selectedMonth);
    currentDate.setMonth(
      currentDate.getMonth() + (direction === 'next' ? 1 : -1)
    );

    if (currentDate > new Date()) {
      return;
    }

    setSelectedMonth(currentDate.getMonth());
    setSelectedYear(currentDate.getFullYear());
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);

  const formatDays = useMemo(() => {
    const validMonthInfo = Array.isArray(monthInfo) ? monthInfo : [];
    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;

      const dateFormate = `${day < 10 ? '0' + day : day}.${
        selectedMonth + 1 < 10 ? '0' + (selectedMonth + 1) : selectedMonth + 1
      }`;

      const dayInfo = validMonthInfo.find(data => data.date === dateFormate);
      const percent = dayInfo ? parseInt(dayInfo.percent, 10) : 0;

      return {
        day,
        percent,
      };
    });
  }, [daysInMonth, monthInfo, selectedMonth]);

  return (
    <div className={css.state}>
      <div className={css.wrap}>
        <h3 className={css.header}>Month</h3>
        <div className={css.paginator}>
          <button className={css.btn} onClick={() => handleMonthChange('prev')}>
            <svg className={css.svg}>
              <use href="../src/assets/images/sprite.svg#arrow-left" />
            </svg>
          </button>
          <p
            className={css.date}
          >{`${monthNames[selectedMonth]}, ${selectedYear}`}</p>
          {selectedYear < currentYear ||
          (selectedYear === currentYear && selectedMonth < currentMonth) ? (
            <button
              className={css.btn}
              onClick={() => handleMonthChange('next')}
            >
              <svg className={css.svg}>
                <use href="../src/assets/images/sprite.svg#arrow-right" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
      <ul className={css.list}>
        {formatDays.map(({ day, percent }, index) => (
          <li key={index} className={css.item}>
            {day}
            <div className={css.percent}>{percent}%</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
