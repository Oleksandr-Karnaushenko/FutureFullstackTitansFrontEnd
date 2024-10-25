import WaterСonsumptionTracker from '../WaterСonsumptionTracker/WaterСonsumptionTracker';
import WhyDrinkWater from '../WhyDrinkWater/WhyDrinkWater';
import css from './Main.module.css';

export default function Main() {
  return (
    <div className={css.container}>
      <div>
        <WaterСonsumptionTracker />
      </div>
      <div>
        <WhyDrinkWater />
      </div>
    </div>
  );
}
