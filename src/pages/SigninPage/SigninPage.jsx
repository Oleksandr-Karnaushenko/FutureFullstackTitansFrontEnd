import AuthForm from '../../components/AuthForm/AuthForm';
import styles from './SigninPage.module.css'; // Підключаємо стилі

export default function SigninPage() {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>Sign in</h2>
        <AuthForm isSignup={false} />
      </div>
    </div>
  );
}
