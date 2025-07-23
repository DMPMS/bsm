import FormGroup from "../components/formGroup/formGroup";
import Input from "../components/input/input";
import Spinner from "../components/spinner/spinner";
import { FieldStateEnum } from "../enums/FieldState.enum";
import { useSignIn } from "../hooks/useSignIn";
import styles from "../styles/signInScreen.module.css";

const SignInScreen = () => {
  const {
    loadingRequest,
    disabledButton,
    invalidFields,
    warningFields,
    handleChangeInput,
    handleSignIn,
    handleSignUp,
  } = useSignIn();

  return (
    <div className={styles.container}>
      <div className={styles.cardSignIn}>
        <img className={styles.logo} src="/logo.png" />
        <h2 className={styles.h2}>Entrar</h2>
        <form onSubmit={handleSignIn} className={styles.form}>
          <FormGroup label="E-mail">
            <Input
              type="email"
              placeholder="seuemail@email.com"
              onChange={(e) => handleChangeInput(e, "email")}
              disabled={loadingRequest}
              fieldState={
                invalidFields.includes("email")
                  ? FieldStateEnum.Invalid
                  : warningFields.includes("email")
                  ? FieldStateEnum.Warning
                  : FieldStateEnum.Default
              }
            />
          </FormGroup>

          <FormGroup label="Senha">
            <Input
              type="password"
              placeholder="••••••••"
              onChange={(e) => handleChangeInput(e, "password")}
              disabled={loadingRequest}
              fieldState={
                invalidFields.includes("password")
                  ? FieldStateEnum.Invalid
                  : warningFields.includes("password")
                  ? FieldStateEnum.Warning
                  : FieldStateEnum.Default
              }
            />
          </FormGroup>

          <div className={styles.containerSignUp}>
            <a href="" onClick={handleSignUp} className={styles.signUp}>
              Novo por aqui? Criar conta.
            </a>
          </div>

          <button
            type="submit"
            className={styles.button}
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
