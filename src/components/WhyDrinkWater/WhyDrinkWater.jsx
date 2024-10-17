
import css from './WhyDrinkWater.module.css'

export default function WhyDrinkWater () {

    return <div>
        <h1>Water consumption tracker</h1>
        <h2>Record daily water intake and track</h2>
        <p>Tracker Benefits:</p>
        <ul>
            <li>Habit drive</li>
            <li>View statistics</li>
            <li>Personal rate setting</li>
        </ul>
        <NavLink  to="/signup">
        <button type="button">Try tracker</button>
      </NavLink>
        
    </div>
}