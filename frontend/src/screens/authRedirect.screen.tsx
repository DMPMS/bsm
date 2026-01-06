import styles from "../styles/authRedirectScreen.module.css";
import Spinner from "../components/spinner/spinner";
import { useAuthRedirect } from "../hooks/useAuthRedirect";

const AuthRedirectScreen = () => {
  useAuthRedirect();

  return (
    <div className={styles.container}>
      <Spinner size={50} />
    </div>
  );
};

export default AuthRedirectScreen;
