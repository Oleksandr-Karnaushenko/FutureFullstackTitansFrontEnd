import DailyNorma from '../../components/DailyNorma/DailyNorma';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel';

import { TodayWater } from '../../components/TodayWater/TodayWater';

import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={css.background}>
      <div className={css.container}>
<<<<<<< Updated upstream
        <DailyNorma />
        <WaterRatioPanel />
        <AddWaterBtn />
        <TodayWater />
=======
        <div className={css.leftColumn}>
          {/* <TestBtn /> */}
          <DailyNorma />
          <WaterRatioPanel />
        </div>
        <div className={css.column}>
          <TodayWater />
          <MonthStatsTable />
        </div>
>>>>>>> Stashed changes
      </div>
    </div>
  );
}
