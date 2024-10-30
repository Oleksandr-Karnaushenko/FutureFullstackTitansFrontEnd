import css from './Header.module.css';
import Logo from '../Logo/Logo';
import UserAuth from '../UserAuth/UserAuth';
import UserLogo from '../UserLogo/UserLogo';
import { useSelector } from 'react-redux';
import ThemeBtn from '../ThemeBtn/ThemeBtn.jsx';
import {
  selectIsLoggedIn,
  selectCurrentUser,
} from '../../redux/auth/authSelectors';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectCurrentUser);

  return (
    <header className={css.container}>
      <Logo isAuthenticated={isLoggedIn} />
      <ThemeBtn />
      {isLoggedIn ? <UserLogo user={user} /> : <UserAuth />}
    </header>
  );
};

export default Header;
