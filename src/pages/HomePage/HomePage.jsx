import DailyNorma from '../../components/DailyNorma/DailyNorma';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel';
import { TodayWater } from '../../components/TodayWater/TodayWater';
import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable';

import css from './HomePage.module.css';
// import { TestBtn } from '../../components/TestBtn/TestBtn.jsx';

export default function HomePage() {
  return (
    <div className={css.background}>
      <div className={css.container}>
        <div className={css.leftColumn}>
          {/* <TestBtn /> */}
          <DailyNorma />
          <WaterRatioPanel />
        </div>
        <div className={css.column}>
          <TodayWater />
          <MonthStatsTable />
        </div>
      </div>
    </div>
  );
}
