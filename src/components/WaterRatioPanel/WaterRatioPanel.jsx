import css from './WaterRatioPanel.module.css';
import AddWaterBtn from '../../components/AddWaterBtn/AddWaterBtn';
import { useSelector } from 'react-redux';
import { selectWaterVolumeInPercent } from '../../redux/water/waterSelectors';

export default function WaterRatioPanel() {
  const progress = useSelector(selectWaterVolumeInPercent);

  return (
    <div className={css.wrapper}>
      <div className={css.ratioPanelWrap}>
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
          <span
            className={`${css.ratioLabel} ${progress >= 0 ? css.active : ''}`}
          >
            0%
          </span>
          <span
            className={`${css.ratioLabel} ${progress >= 0 ? css.active : ''}`}
          >
            50%
          </span>
          <span
            className={`${css.ratioLabel} ${progress >= 0 ? css.active : ''}`}
          >
            100%
          </span>
        </div>
      </div>
      <AddWaterBtn />
    </div>
  );
}
