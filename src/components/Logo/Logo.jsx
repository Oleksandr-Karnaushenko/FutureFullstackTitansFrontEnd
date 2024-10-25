import css from './Logo.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const handleWaterTrackerClick = () => {
    if (isLoggedIn) {
      navigate('/home');
    } else {
      navigate('/welcome');
    }
  };

  return (
    <nav className={css.nav}>
      <button className={css.title} onClick={handleWaterTrackerClick}>
        <svg className={css.icon}>
          <use href="/src/assets/images/icons.svg#icon-logo" />
        </svg>
      </button>
    </nav>
  );
};

export default Logo;
