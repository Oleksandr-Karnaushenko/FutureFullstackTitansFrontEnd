import css from './DailyNorma.module.css';

export default function DailyNorma() {
  return (
    <>
      <div className={css.dailyWrapper}>
        <h2 className={css.title}>My daily norma</h2>
        <div className={css.normaWrap}>
          <p className={css.normaText}>1.5 L</p>
          <button className={css.editBtn}>Edit</button>
        </div>
      </div>
      <div className={css.wrapper}></div>
    </>
  );
}
