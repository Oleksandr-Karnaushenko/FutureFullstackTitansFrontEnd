import css from './DailyNorma.module.css';

export default function DailyNorma() {
  return (
    <div className={css.dailyWrapper}>
      <h2 className={css.title}>My daily norma</h2>
      <div className={css.normaWrap}>
        <p>1.5 L</p>
        <button>Edit</button>
      </div>
    </div>
  );
}
