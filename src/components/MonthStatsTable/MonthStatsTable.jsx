import { useState } from 'react';
import css from './MonthStatsTable.module.css';

export default function MonthStatsTable() {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

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

  return (
    <div className={css.state}>
      <div className={css.wrap}>
        <h3 className={css.header}>Month</h3>
        <div className={css.paginator}>
          <button onClick={() => handleMonthChange('prev')}>
            <svg className={css.svg}>
              <use href="../src/assets/img/icons.svg#icon-left-arrow" />
            </svg>
          </button>
          <p
            className={css.date}
          >{`${monthNames[selectedMonth]}, ${selectedYear}`}</p>
          {selectedYear < currentYear ||
          (selectedYear === currentYear && selectedMonth < currentMonth) ? (
            <button onClick={() => handleMonthChange('next')}>
              <svg className={css.svg}>
                <use href="../src/assets/img/icons.svg#icon-right-arrow" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
      <ul className={css.list}>
        {Array.from({ length: daysInMonth }, (_, index) => (
          <div>
            <li className={css.item} key={index}>
              {index + 1}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
