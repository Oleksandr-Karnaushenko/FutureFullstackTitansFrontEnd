import { GoDotFill } from 'react-icons/go';
import css from './WhyDrinkWater.module.css';

export default function WhyDrinkWater() {
  return (
    <div className={css.container}>
      <h2 className={css.title}>Why drink water</h2>
      <ul className={css.list}>
        <li className={css.listItem}>
          <GoDotFill className={css.icon} />
          Supply of nutrients to all organs
        </li>
        <li className={css.listItem}>
          <GoDotFill className={css.icon} />
          Providing oxygen to the lungs
        </li>
        <li className={css.listItem}>
          <GoDotFill className={css.icon} />
          Maintaining the work of the heart
        </li>
        <li className={css.listItem}>
          <GoDotFill className={css.icon} />
          Release of processed substances
        </li>
        <li className={css.listItem}>
          <GoDotFill className={css.icon} />
          Ensuring the stability of the internal environment
        </li>
        <li className={css.listItem}>
          <GoDotFill className={css.icon} />
          Maintaining within the normal temperature
        </li>
        <li className={css.listItem}>
          <GoDotFill className={css.icon} />
          Maintaining an immune system capable of resisting disease
        </li>
      </ul>
    </div>
  );
}
