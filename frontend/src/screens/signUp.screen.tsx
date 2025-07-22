import styles from "../styles/signUpScreen.module.css";
import { useSignUp } from "../hooks/useSignUp";
import CustomSelect from "../components/select/select";
import Country from "../components/country/country";
import { FieldStateEnum } from "../enums/FieldState.enum";
import Spinner from "../components/spinner/spinner";

const SignUpScreen = () => {
  const {
    signUp,
    loadingRequest,
    disabledButton,
    warningFields,
    invalidFields,
    countrySelectValidationMessage,
    loadingCountries,
    countries,
    handleChangeInput,
    handleChangeCountrySelect,
    handleSignUp,
    handleSignIn,
    handleReset,
  } = useSignUp();

  return loadingCountries ? (
    <div className={styles.container}>
      <Spinner size={50} />
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.cardSignUp}>
        <h2 className={styles.h2}>Criar Conta</h2>
        <form onSubmit={handleSignUp} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Nome <span className={styles.asterisk}>*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Nome"
              value={signUp.name}
              onChange={(e) => handleChangeInput(e, "name")}
              className={`${styles.field} ${
                warningFields.includes("name") ? styles.warningField : ""
              } ${invalidFields.includes("name") ? styles.invalidField : ""}`}
              disabled={loadingRequest}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Data de nascimento <span className={styles.asterisk}>*</span>
            </label>
            <input
              id="birthdate"
              type="date"
              value={signUp.birthdate}
              onChange={(e) => handleChangeInput(e, "birthdate")}
              className={`${styles.field} ${
                warningFields.includes("birthdate") ? styles.warningField : ""
              } ${
                invalidFields.includes("birthdate") ? styles.invalidField : ""
              }`}
              disabled={loadingRequest}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              E-mail <span className={styles.asterisk}>*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="seuemail@email.com"
              value={signUp.email}
              onChange={(e) => handleChangeInput(e, "email")}
              className={`${styles.field} ${
                warningFields.includes("email") ? styles.warningField : ""
              } ${invalidFields.includes("email") ? styles.invalidField : ""}`}
              disabled={loadingRequest}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Nacionalidade <span className={styles.asterisk}>*</span>
            </label>
            <CustomSelect
              placeholder="Selecione o país"
              value={signUp.countryId || ""}
              onChange={(value: string | number) =>
                handleChangeCountrySelect(String(value))
              }
              options={countries.map((country) => ({
                value: country.id,
                name: country.name,
                display: (
                  <Country countryCode={country.code} name={country.name} />
                ),
              }))}
              validationMessage={countrySelectValidationMessage}
              fieldState={
                warningFields.includes("countryId")
                  ? FieldStateEnum.Warning
                  : invalidFields.includes("countryId")
                  ? FieldStateEnum.Invalid
                  : FieldStateEnum.Default
              }
              disabled={loadingRequest}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Senha <span className={styles.asterisk}>*</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={signUp.password}
              onChange={(e) => handleChangeInput(e, "password")}
              className={`${styles.field} ${
                warningFields.includes("password") ? styles.warningField : ""
              } ${
                invalidFields.includes("password") ? styles.invalidField : ""
              }`}
              disabled={loadingRequest}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Confirmar senha <span className={styles.asterisk}>*</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={signUp.confirmPassword}
              onChange={(e) => handleChangeInput(e, "confirmPassword")}
              className={`${styles.field} ${
                warningFields.includes("confirmPassword")
                  ? styles.warningField
                  : ""
              } ${
                invalidFields.includes("confirmPassword")
                  ? styles.invalidField
                  : ""
              }`}
              disabled={loadingRequest}
            />
          </div>

          <div className={styles.containerSignIn}>
            <a href="" onClick={handleSignIn} className={styles.signIn}>
              Já é cadastrado? Entrar.
            </a>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.button} ${styles.resetButton}`}
              disabled={loadingRequest}
              onClick={handleReset}
            >
              Resetar
            </button>

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
                <span>Criar Conta</span>
                {loadingRequest && (
                  <Spinner size={12} classname={styles.spinner} />
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpScreen;
