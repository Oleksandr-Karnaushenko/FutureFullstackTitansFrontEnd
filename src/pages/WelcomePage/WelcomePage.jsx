import css from './WelcomePage.module.css';
import Main from '../../components/Main/Main.jsx';

import { TestBtn } from '../../components/TestBtn/TestBtn.jsx'; // for tests

export default function WelcomePage() {
  return (
    <div className={css.container}>
      {/* <TestBtn /> */}
      <Main />
    </div>
  );
}
