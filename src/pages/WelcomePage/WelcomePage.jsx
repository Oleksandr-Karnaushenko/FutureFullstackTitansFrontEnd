import { useSelector } from "react-redux";
import css from './WelcomePage.module.css';
import Main from '../../components/Main/Main';
import { getToken } from "../../redux/auth/authSelectors";


export default function WelcomePage(){
    const isLogedIn = useSelector(getToken);
    return <div>
    {!isLogedIn && <Main/>}
    </div>
}