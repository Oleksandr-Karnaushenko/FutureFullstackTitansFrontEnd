import AuthForm from '../../components/AuthForm/AuthForm';
import styles from './SignupPage.module.css';

export default function SignupPage() {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>Sign Up</h2>
        <AuthForm isSignup={true} />
      </div>
    </div>
  );
}
