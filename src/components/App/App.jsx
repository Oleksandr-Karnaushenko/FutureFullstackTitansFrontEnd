import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import SharedLayout from '../SharedLayout/SharedLayout.jsx';
import RestrictedRoute from '../../utility/RestrictedRoute.jsx';
import PrivateRoute from '../../utility/PrivateRoute.jsx';

const WelcomePage = lazy(() => import('./pages/WelcomePage/WelcomePage'));
const SignupPage = lazy(() => import('./pages/SignupPage/SignupPage'));
const SigninPage = lazy(() => import('./pages/SigninPage/SigninPage'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));

import './App.css';

import HomePage from '../../pages/HomePage/HomePage';

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path="welcome" element={<WelcomePage />} />
          <Route
            path="signup"
            element={
              <RestrictedRoute component={<SignupPage />} redirectTo="/home" />
            }
          />
          <Route
            path="signin"
            element={
              <RestrictedRoute component={<SigninPage />} redirectTo="/home" />
            }
          />
          <Route
            path="home"
            element={
              <PrivateRoute component={<HomePage />} redirectTo="/signin" />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}


export default function App() {
  return (
    <div className={css.container}>
      <Suspense fallback={<Loader />}>
        <SharedLayout></SharedLayout>
      </Suspense>
    </div>
  );
}
