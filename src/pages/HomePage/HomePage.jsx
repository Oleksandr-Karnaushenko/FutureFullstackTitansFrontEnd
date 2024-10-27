import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectUserId } from '../../redux/auth/authSelectors.js';

import DailyNorma from '../../components/DailyNorma/DailyNorma';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel';
import TodayWater from '../../components/TodayWater/TodayWater';
import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable.jsx';

import css from './HomePage.module.css';
import { fetchUserDataAPI } from '../../redux/auth/authOperation.js';

// import { TestBtn } from '../../components/TestBtn/TestBtn.jsx';

export default function HomePage() {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  useEffect(() => {
    dispatch(fetchUserDataAPI(userId));
    toast.success('Successful login!');
  }, [dispatch, userId]);

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
