import DailyNorma from '../../components/DailyNorma/DailyNorma';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel';
import AddWaterBtn from '../../components/AddWaterBtn/AddWaterBtn';
import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable';

import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={css.wrapper}>
      <DailyNorma />
      <WaterRatioPanel />
      <AddWaterBtn />
      <MonthStatsTable />
    </div>
  );
}
