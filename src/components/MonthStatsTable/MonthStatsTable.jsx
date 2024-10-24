import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentMonthInfoAPI } from '../../redux/water/waterOperation.js';
import { selectMonthInfo } from '../../redux/water/waterSelectors.js';
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats.jsx';
import css from './MonthStatsTable.module.css';

export default function MonthStatsTable() {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedDayInfo, setSelectedDayInfo] = useState(null);
  const statsRef = useRef(null);

  const dispatch = useDispatch();
  const monthInfo = useSelector(selectMonthInfo);

  useEffect(() => {
    const formattedMonth =
      selectedMonth + 1 < 10 ? '0' + (selectedMonth + 1) : selectedMonth + 1;
    dispatch(
      getCurrentMonthInfoAPI({ month: formattedMonth, year: selectedYear })
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
      const dateFormat = `${day < 10 ? '0' + day : day}.${
        selectedMonth + 1 < 10 ? '0' + (selectedMonth + 1) : selectedMonth + 1
      }`;
      const dayInfo = validMonthInfo.find(data => data.date === dateFormat);
      const percent = dayInfo
        ? Math.min(parseInt(dayInfo.percent, 10), 100)
        : 0;
      const dailyNorm = dayInfo ? dayInfo.dailyNorm : 0;
      const count = dayInfo ? dayInfo.count : 0;

      return {
        day,
        percent,
        dayInfo: {
          date: dateFormat,
          dailyNorm,
          percent,
          count,
        },
      };
    });
  }, [daysInMonth, monthInfo, selectedMonth]);

  const handleDayClick = (dayInfo, event) => {
    if (selectedDayInfo && selectedDayInfo.date === dayInfo.date) {
      setSelectedDayInfo(null);
    } else {
      setSelectedDayInfo(dayInfo);

      const clickedElement = event.currentTarget;
      const statsElement = statsRef.current;

      if (statsElement) {
        const stateRect = statsElement.parentNode.getBoundingClientRect();
        const clickedRect = clickedElement.getBoundingClientRect();

        const positionY =
          clickedRect.top - stateRect.top - statsElement.offsetHeight - 30;

        statsElement.style.top = `${positionY}px`;
      }
    }
  };

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
        {formatDays.map(({ day, percent, dayInfo }, index) => (
          <li
            key={index}
            className={`${css.item} ${percent < 100 ? css.notReached : ''}`}
            onClick={event => handleDayClick(dayInfo, event)}
          >
            {day}
            <div className={css.percent}>{percent}%</div>
          </li>
        ))}
      </ul>
      {selectedDayInfo && (
        <div ref={statsRef} className={css.dayInfoWrapper}>
          <DaysGeneralStats
            dayInfo={selectedDayInfo}
            selectedMonth={selectedMonth}
            monthNames={monthNames}
          />
        </div>
      )}
    </div>
  );
}
