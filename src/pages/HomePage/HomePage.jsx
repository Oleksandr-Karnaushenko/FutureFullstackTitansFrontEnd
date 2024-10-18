import DailyNorma from '../../components/DailyNorma/DailyNorma';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel';
<<<<<<< Updated upstream
=======
import AddWaterBtn from '../../components/AddWaterBtn/AddWaterBtn';
>>>>>>> Stashed changes

import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={css.wrapper}>
      <DailyNorma />
      <WaterRatioPanel />
      <AddWaterBtn />
    </div>
  );
}
