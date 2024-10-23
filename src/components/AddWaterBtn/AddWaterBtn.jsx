import css from './AddWaterBtn.module.css';

export default function AddWaterBtn() {
  return (
    <div className={css.btnDiv}>
      <button className={css.addWaterBtn}>
        {/* <svg className={css.svgCross}>
          <use xlinkHref="../../assets/images/sprite.svg#plus-circle" />
        </svg> */}
        AddWater
      </button>
    </div>
  );
}
