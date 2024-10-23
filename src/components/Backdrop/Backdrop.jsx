import css from './Backdrop.module.css';

export default function Backdrop(props) {
  return props.show ? (
    <div className={css.backdrop} onClick={props.onClick}></div>
  ) : null;
}
