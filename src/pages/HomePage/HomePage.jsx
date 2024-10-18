import DailyNorma from '../../components/DailyNorma/DailyNorma';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel';
import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={css.wrapper}>
      <DailyNorma />
      <WaterRatioPanel />
    </div>
  );
}
