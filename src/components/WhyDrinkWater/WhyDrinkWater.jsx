import css from "./WhyDrinkWater.module.css";

const WhyDrinkWater = () => {
  return (
    <div className={css.whydrinkwater}>
      <h3 className={css.sectiontitle}>Why drink water</h3>
      <ul className={css.whydrinkwaterlist}>
        <li className={css.whydrinkwaterlistitem}>
          Supply of nutrients to all organs
        </li>
        <li className={css.whydrinkwaterlistitem}>
          Providing oxygen to the lungs
        </li>
        <li className={css.whydrinkwaterlistitem}>
          Maintaining the work of the heart
        </li>
        <li className={css.whydrinkwaterlistitem}>
          Release of processed substances
        </li>
        <li className={css.whydrinkwaterlistitem}>
          Ensuring the stability of the internal environment
        </li>
        <li className={css.whydrinkwaterlistitem}>
          Maintaining within the normal temperature
        </li>
        <li className={css.whydrinkwaterlistitem}>
          Maintaining an immune system capable of resisting disease
        </li>
      </ul>
    </div>
  );
};

export default WhyDrinkWater;
