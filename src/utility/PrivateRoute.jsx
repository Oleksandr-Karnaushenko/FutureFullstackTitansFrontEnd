import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/authSelectors.js';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ component, redirectTo }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
}
