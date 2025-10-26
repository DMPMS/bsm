import styles from "../styles/signUpScreen.module.css";
import { useSignUp } from "../hooks/useSignUp";
import Select from "../components/select/select";
import Country from "../components/country/country";
import { FieldStateEnum } from "../enums/FieldState.enum";
import Spinner from "../components/spinner/spinner";
import FormGroup from "../components/formGroup/formGroup";
import Input from "../components/input/input";
import { formatDateFromDate } from "../utils/formatDateFromDate";
import { CURRENT_DATE } from "../config/constants";
import { FormatDateEnum } from "../enums/FormatDate.enum";
import DatePicker from "../components/datePicker/datePicker";
import { parseDate } from "../utils/formatDateFromString";

const SignUpScreen = () => {
  const {
    signUp,
    loadingRequest,
    disabledButton,
    invalidFields,
    warningFields,
    birthdateInputValidationMessage,
    countrySelectValidationMessage,
    loadingCountries,
    countries,
    handleChangeInput,
    handleChangeBirthdateInput,
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
        <form className={styles.form} onSubmit={handleSignUp}>
          <FormGroup label="Nome" required={true}>
            <Input
              id="name"
              type="text"
              placeholder="Nome"
              value={signUp.name}
              onChange={(e) => handleChangeInput(e, "name")}
              disabled={loadingRequest}
              fieldState={
                invalidFields.includes("name")
                  ? FieldStateEnum.Invalid
                  : warningFields.includes("name")
                  ? FieldStateEnum.Warning
                  : FieldStateEnum.Default
              }
            />
          </FormGroup>

          <FormGroup
            label="Data de nascimento"
            required={true}
            tooltip={`A data atual no sistema é ${formatDateFromDate(
              CURRENT_DATE,
              FormatDateEnum.SLASH_DD_MM_YYYY
            )}`}
          >
            <DatePicker
              onChange={handleChangeBirthdateInput}
              value={
                signUp.birthdate
                  ? parseDate(signUp.birthdate, FormatDateEnum.DASH_YYYY_MM_DD)
                  : undefined
              }
              disabled={loadingRequest}
              validationMessage={birthdateInputValidationMessage}
              fieldState={
                invalidFields.includes("birthdate")
                  ? FieldStateEnum.Invalid
                  : warningFields.includes("birthdate")
                  ? FieldStateEnum.Warning
                  : FieldStateEnum.Default
              }
            />
          </FormGroup>

          <FormGroup label="E-mail" required={true}>
            <Input
              id="email"
              type="email"
              placeholder="seuemail@email.com"
              value={signUp.email}
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

          <FormGroup label="Nacionalidade" required={true}>
            <Select
              placeholder="Selecione o país"
              value={signUp.countryId}
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
              disabled={loadingRequest}
              validationMessage={countrySelectValidationMessage}
              fieldState={
                invalidFields.includes("countryId")
                  ? FieldStateEnum.Invalid
                  : warningFields.includes("countryId")
                  ? FieldStateEnum.Warning
                  : FieldStateEnum.Default
              }
            />
          </FormGroup>

          <FormGroup label="Senha" required={true}>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={signUp.password}
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

          <FormGroup label="Confirmar senha" required={true}>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={signUp.confirmPassword}
              onChange={(e) => handleChangeInput(e, "confirmPassword")}
              disabled={loadingRequest}
              fieldState={
                invalidFields.includes("confirmPassword")
                  ? FieldStateEnum.Invalid
                  : warningFields.includes("confirmPassword")
                  ? FieldStateEnum.Warning
                  : FieldStateEnum.Default
              }
            />
          </FormGroup>

          <div className={styles.signInContainer}>
            <a className={styles.signIn} href="" onClick={handleSignIn}>
              Já é cadastrado? Entrar.
            </a>
          </div>

          <div className={styles.actions}>
            <button
              className={`${styles.button} ${styles.resetButton}`}
              type="button"
              disabled={loadingRequest}
              onClick={handleReset}
            >
              Resetar
            </button>

            <button
              className={`${styles.button} ${styles.submitButton}`}
              type="submit"
              disabled={disabledButton || loadingRequest}
            >
              <span
                className={`${styles.buttonContent} ${
                  loadingRequest && styles.buttonContentLoading
                }`}
              >
                <span>Criar Conta</span>
                {loadingRequest && (
                  <Spinner size={12} className={styles.spinner} />
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
