import { useTheme } from '../../utility/ThemeContext.jsx';
import styles from './ThemeBtn.module.css';

const ThemeBtn = () => {
  const { toggleTheme } = useTheme();

  return (
    <button className={styles.themeButton} onClick={toggleTheme}>
      Swap
    </button>
  );
};

export default ThemeBtn;
