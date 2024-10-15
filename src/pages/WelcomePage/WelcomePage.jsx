import WaterConsumptionTracker from "../../components/WaterConsumptionTracker/WaterConsumptionTracker.jsx";
import WhyDrinkWater from "../../components/WhyDrinkWater/WhyDrinkWater.jsx";
import css from "./WelcomePage.module.css";

const WelcomePage = () => {
  return (
    <div className={css.welcomepage}>
      <div className={css.welcomepagecontainer}>
        <div className={css.components}>
          <WaterConsumptionTracker />
          <WhyDrinkWater />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
