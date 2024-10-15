import { useNavigate } from "react-router-dom";
import css from "./WaterConsumptionTracker.module.css";

const WaterConsumptionTracker = () => {
  const navigate = useNavigate();

  const handleTryTrackerClick = () => {
    navigate("/signup");
  };

  return (
    <div className={css.waterconsumptiontracker}>
      <h1 className={css.pagetitle}>Water consumption tracker</h1>
      <h2 className={css.pagesubtitle}>Record daily water intake and track</h2>
      <div className={css.trackerbenefits}>
        <h3 className={css.sectiontitle}>Tracker Benefits</h3>
        <ul className={css.trackerbenefitslist}>
          <li className={css.trackerbenefitslistitem}>
            <svg className={css.benefiticon}>
              <use href="/src/assets/img/icons.svg#icon-calendar" />
            </svg>
            Habit drive
          </li>
          <li className={css.trackerbenefitslistitem}>
            <svg className={css.benefiticon}>
              <use href="/src/assets/img/icons.svg#icon-statistic" />
            </svg>
            View statistics
          </li>
          <li className={css.trackerbenefitslistitem}>
            <svg className={css.benefiticon}>
              <use href="/src/assets/img/icons.svg#icon-key" />
            </svg>
            Personal rate setting
          </li>
        </ul>
      </div>
      <button onClick={handleTryTrackerClick} className={css.trybutton}>
        Try tracker
      </button>
    </div>
  );
};

export default WaterConsumptionTracker;
