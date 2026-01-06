import FormGroup from "../components/formGroup/formGroup";
import Input from "../components/input/input";
import Spinner from "../components/spinner/spinner";
import { useSignIn } from "../hooks/useSignIn";
import styles from "../styles/signInScreen.module.css";
import { getFieldState } from "../utils/getFieldState";

const SignInScreen = () => {
  const {
    loadingRequest,
    disabledButton,
    fieldsStatus,
    handleChangeInput,
    handleSignIn,
    handleSignUp,
  } = useSignIn();

  return (
    <div className={styles.container}>
      <div className={styles.cardSignIn}>
        <img className={styles.logo} src="/logo.png" />
        <h2 className={styles.h2}>Entrar</h2>
        <form className={styles.form} onSubmit={handleSignIn}>
          <div className={styles.containerFormGroups}>
            <FormGroup label="E-mail">
              <Input
                type="email"
                placeholder="seuemail@email.com"
                onChange={(e) => handleChangeInput(e, "email")}
                disabled={loadingRequest}
                fieldState={getFieldState("email", fieldsStatus)}
              />
            </FormGroup>

            <FormGroup label="Senha">
              <Input
                type="password"
                placeholder="••••••••"
                onChange={(e) => handleChangeInput(e, "password")}
                disabled={loadingRequest}
                fieldState={getFieldState("password", fieldsStatus)}
              />
            </FormGroup>
          </div>

          <div className={styles.signUpContainer}>
            <a className={styles.signUp} href="" onClick={handleSignUp}>
              Novo por aqui? Criar conta.
            </a>
          </div>

          <button
            className={styles.button}
            type="submit"
            disabled={disabledButton || loadingRequest}
          >
            <span
              className={`${styles.buttonContent} ${
                loadingRequest && styles.buttonContentLoading
              }`}
            >
              Entrar
              {loadingRequest && (
                <Spinner size={12} className={styles.spinner} />
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInScreen;
