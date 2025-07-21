import Spinner from "../components/spinner/spinner";
import { useSignIn } from "../hooks/useSignIn";
import styles from "../styles/signInScreen.module.css";

const SignInScreen = () => {
  const {
    loadingRequest,
    disabledButton,
    warningFields,
    invalidFields,
    handleOnChangeInput,
    handleOnSignIn,
    handleOnSignUp,
  } = useSignIn();

  return (
    <div className={styles.container}>
      <div className={styles.cardSignIn}>
        <img className={styles.logo} src="/logo.png" />
        <h2 className={styles.h2}>Entrar</h2>
        <form onSubmit={handleOnSignIn} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>E-mail</label>
            <input
              type="email"
              placeholder="seuemail@email.com"
              onChange={(e) => handleOnChangeInput(e, "email")}
              className={`${styles.field} ${
                warningFields.includes("email") ? styles.warningField : ""
              } ${invalidFields.includes("email") ? styles.invalidField : ""}`}
              disabled={loadingRequest}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => handleOnChangeInput(e, "password")}
              className={`${styles.field} ${
                warningFields.includes("password") ? styles.warningField : ""
              } ${
                invalidFields.includes("password") ? styles.invalidField : ""
              }`}
              disabled={loadingRequest}
            />
          </div>

          <div className={styles.containerSignUp}>
            <a href="" onClick={handleOnSignUp} className={styles.signUp}>
              Novo por aqui? Criar conta.
            </a>
          </div>

          <button
            type="submit"
            className={`${styles.button} ${styles.submitButton}`}
            disabled={disabledButton || loadingRequest}
          >
            <span
              className={`${styles.buttonContent} ${
                loadingRequest && styles.buttonContentLoading
              }`}
            >
              <span>Entrar</span>
              {loadingRequest && (
                <Spinner size={12} classname={styles.spinner} />
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInScreen;
