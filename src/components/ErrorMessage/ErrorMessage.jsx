import css from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return (
    <div className={css.container}>
      <p className={css.errorText}>
        Oops! Something went wrong, please reload this page!
      </p>
    </div>
  );
}
