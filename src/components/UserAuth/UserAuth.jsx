import { NavLink } from "react-router-dom";
import css from "./UserAuth.module.css";
const UserAuth = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.linkWrapper}>
        <NavLink className={css.navLink} to="/signin">
          Sign in
          <svg className={css.icon}>
            <use href="/src/assets/images/icons.svg#icon-user" />
          </svg>
        </NavLink>
      </div>
    </div>
  );
};

export default UserAuth;
