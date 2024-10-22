import css from './WaterRatioPanel.module.css';
import AddWaterBtn from '../../components/AddWaterBtn/AddWaterBtn';
const progressPercentage = 77; //for example, in real it will be gotten from user water info

export default function WaterRatioPanel() {
  return (
    <div className={css.wrapper}>
      <div className={css.ratioPanelWrap}>
        <h2 className={css.panelTitle}>Today</h2>
        <div className={css.ratioPanelMain}>
          <div
            className={css.ratioPanelProgress}
            style={{ width: `${progressPercentage}%` }}
          ></div>
          <div
            className={css.ratioPanelDot}
            style={{ left: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className={css.ratioPanelLabels}>
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
      <AddWaterBtn />
    </div>
  );
}
