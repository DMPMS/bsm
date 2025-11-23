import { useNotFound } from "../hooks/useNotFound";
import styles from "../styles/notFoundScreen.module.css";

const NotFoundScreen = () => {
  const { handleClickButton } = useNotFound();

  return (
    <div className={styles.container}>
      <div className={styles.cardNotFound}>
        <h2 className={styles.h2}>Erro 404</h2>
        <div className={styles.text}>Página não encontrada</div>
        <button
          className={styles.button}
          type="button"
          onClick={handleClickButton}
        >
          Página de Login
        </button>
      </div>
    </div>
  );
};

export default NotFoundScreen;
