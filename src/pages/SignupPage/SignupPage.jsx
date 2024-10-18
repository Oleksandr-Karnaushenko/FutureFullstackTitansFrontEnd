import AuthForm from '../../components/AuthForm/AuthForm';
import styles from './SignupPage.module.css'; // Підключаємо стилі

export default function SignupPage() {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>Sign up</h2>
        <AuthForm isSignup={true} />
      </div>
    </div>
  );
}
