
import { NavLink } from 'react-router-dom'
import css from './WaterСonsumptionTracker.module.css'

export default function WaterСonsumptionTracker () {

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