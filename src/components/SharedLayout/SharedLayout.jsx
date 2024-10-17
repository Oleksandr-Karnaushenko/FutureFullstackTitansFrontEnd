import { Outlet } from 'react-router-dom';
import css from './SharedLayout.module.css';

import Header from '../Header/Header';

export default function SharedLayout() {
  return (
    <div className="css.container">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
