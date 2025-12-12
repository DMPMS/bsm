import styles from "../styles/signUpScreen.module.css";
import { useSignUp } from "../hooks/useSignUp";
import Select from "../components/select/select";
import Country from "../components/country/country";
import Spinner from "../components/spinner/spinner";
import FormGroup from "../components/formGroup/formGroup";
import Input from "../components/input/input";
import { formatDateFromDate } from "../utils/formatDateFromDate";
import { CURRENT_DATE, DEFAULT_USER_IMAGE_URL } from "../config/constants";
import { FormatDateEnum } from "../enums/FormatDate.enum";
import DatePicker from "../components/datePicker/datePicker";
import { parseDate } from "../utils/formatDateFromString";
import ImagePreview from "../components/imagePreview/imagePreview";
import { getFieldState } from "../utils/getFieldState";

const SignUpScreen = () => {
  const {
    signUp,
    loadingRequest,
    imageUrl,
    disabledButton,
    fieldsStatus,
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
          <div className={styles.containerImagePreview}>
            <ImagePreview
              imageUrl={imageUrl}
              backgroundUrl={DEFAULT_USER_IMAGE_URL}
              size={100}
            />
          </div>

          <div className={styles.containerFormGroups}>
            <FormGroup label="Nome" required={true}>
              <Input
                id="name"
                type="text"
                placeholder="Nome"
                value={signUp.name}
                onChange={(e) => handleChangeInput(e, "name")}
                disabled={loadingRequest}
                fieldState={getFieldState("name", fieldsStatus)}
              />
            </FormGroup>

            <FormGroup
              label="Caminho da Imagem"
              tooltip={
                "Recomenda-se o uso de uma imagem de fundo transparente, com formato quadrado. A resolução máxima utilizada será de 100x100 pixels."
              }
            >
              <Input
                id="imageUrl"
                type="text"
                placeholder="https://site.com/imagem.png"
                value={signUp.imageUrl}
                onChange={(e) => handleChangeInput(e, "imageUrl")}
                disabled={loadingRequest}
                fieldState={getFieldState("imageUrl", fieldsStatus)}
              />
            </FormGroup>

            <FormGroup
              label="Data de Nascimento"
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
                    ? parseDate(
                        signUp.birthdate,
                        FormatDateEnum.DASH_YYYY_MM_DD
                      )
                    : undefined
                }
                disabled={loadingRequest}
                validationMessage={birthdateInputValidationMessage}
                fieldState={getFieldState("birthdate", fieldsStatus)}
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
                fieldState={getFieldState("email", fieldsStatus)}
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
                fieldState={getFieldState("countryId", fieldsStatus)}
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
                fieldState={getFieldState("password", fieldsStatus)}
              />
            </FormGroup>

            <FormGroup label="Confirmar Senha" required={true}>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={signUp.confirmPassword}
                onChange={(e) => handleChangeInput(e, "confirmPassword")}
                disabled={loadingRequest}
                fieldState={getFieldState("confirmPassword", fieldsStatus)}
              />
            </FormGroup>
          </div>

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
