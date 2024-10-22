import DailyNorma from '../../components/DailyNorma/DailyNorma';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel';
import AddWaterBtn from '../../components/AddWaterBtn/AddWaterBtn';
import { TodayWater } from '../../components/TodayWater/TodayWater';
import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable.jsx';
import css from './HomePage.module.css';

// import { TestBtn } from '../../components/TestBtn/TestBtn.jsx';

export default function HomePage() {
  return (
    <div className={css.background}>
      <div className={css.container}>
        {/* <TestBtn /> */}
        <DailyNorma />
        <WaterRatioPanel />
        <AddWaterBtn />
        <TodayWater />
        <MonthStatsTable />
      </div>
    </div>
  );
}
