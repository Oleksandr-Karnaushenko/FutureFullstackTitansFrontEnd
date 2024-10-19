
import Icon from '../Icon/Icon';
import css from "./ButtonBtn.module.css"

export const ButtonBtn =({icon, name, classNameBtnIcon, clasNameBtn, type, onClick})=>{

     return (
        <>
        <button type={type}  className={`${css.buttonBtn} ${clasNameBtn}`} onClick={onClick}>
        <Icon name ={icon} className={`${css.buttonBtnIcon} ${classNameBtnIcon}`}/>
            <span>{name}</span>
        </button>
        </>
    );


}