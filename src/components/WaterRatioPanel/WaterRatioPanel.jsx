import css from './WaterRatioPanel.module.css';
import AddWaterBtn from '../../components/AddWaterBtn/AddWaterBtn';
import { useSelector } from 'react-redux';
import { selectWaterVolumeInPercent } from '../../redux/water/waterSelectors';

export default function WaterRatioPanel() {
  const progress = useSelector(selectWaterVolumeInPercent);
  const getLabelClass = threshold => {
    if (progress === threshold) {
      return `${css.ratioLabel} ${css.active}`;
    }
    return css.ratioLabel;
  };

  return (
    <div className={css.wrapper}>
      <div className={css.panel}>
        <h2 className={css.panelTitle}>Today</h2>
        <div className={css.ratioPanelMain}>
          <div
            className={css.ratioPanelProgress}
            style={{ width: `${progress}%` }}
          ></div>
          <div
            className={css.ratioPanelDot}
            style={{ left: `${progress}%` }}
          ></div>
        </div>
        <div className={css.ratioPanelLabels}>
          <span className={getLabelClass(0)}>0%</span>
          <span className={getLabelClass(50)}>50%</span>
          <span className={getLabelClass(100)}>100%</span>
        </div>
      </div>
      <AddWaterBtn />
    </div>
  );
}
