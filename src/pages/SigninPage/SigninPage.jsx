import AuthForm from '../../components/AuthForm/AuthForm';
import styles from './SigninPage.module.css';

export default function SigninPage() {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>Sign In</h2>
        <AuthForm isSignup={false} />
      </div>
    </div>
  );
}
