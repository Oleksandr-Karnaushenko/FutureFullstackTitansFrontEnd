import css from './App.module.css';
import { lazy } from 'react';
import SharedLayout from '../SharedLayout/SharedLayout';
import Loader from '../Loader/Loader';
import { Suspense } from 'react';

const WelcomePage = lazy(() => import('../../pages/WelcomePage/WelcomePage'));

export default function App() {
  return (
    <div className={css.container}>
      <Suspense fallback={<Loader />}>
        <SharedLayout></SharedLayout>
      </Suspense>
    </div>
  );
}
