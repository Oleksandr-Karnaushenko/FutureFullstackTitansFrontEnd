import DailyNorma from '../../components/DailyNorma/DailyNorma.jsx';
import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={css.wrapper}>
      <DailyNorma />
      <div>
        <p>WaterRatioPanel component</p>
      </div>
    </div>
  );
}