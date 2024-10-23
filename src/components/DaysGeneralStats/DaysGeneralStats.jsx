import css from './DaysGeneralStats.module.css';

export default function DaysGeneralStats({
  dayInfo,
  selectedMonth,
  monthNames,
}) {
  const { date, dailyNorm, percent, count } = dayInfo;
  const dailyNormInLitr = ((dailyNorm || 1500) / 1000).toFixed(1);

  return (
    <div className={css.dayInfo}>
      <p className={css.data}>
        {`${parseInt(date.split('.')[0], 10)}, ${monthNames[selectedMonth]}`}
      </p>
      <p className={css.info}>
        Daily norma:
        <span>{dailyNormInLitr} L</span>
      </p>
      <p className={css.info}>
        Fullfillment of the daily norm:
        <span>{percent}%</span>
      </p>
      <p className={css.info}>
        How many servings of the water:<span>{count}</span>
      </p>
    </div>
  );
}
