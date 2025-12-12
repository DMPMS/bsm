import { useParams } from "react-router-dom";
import Country from "../components/country/country";
import DatePicker from "../components/datePicker/datePicker";
import FormGroup from "../components/formGroup/formGroup";
import Header from "../components/header/header";
import ImagePreview from "../components/imagePreview/imagePreview";
import Input from "../components/input/input";
import Select from "../components/select/select";
import Spinner from "../components/spinner/spinner";
import {
  CURRENT_DATE,
  DEFAULT_MANAGERGLOBAL_IMAGE_URL,
} from "../config/constants";
import { FormatDateEnum } from "../enums/FormatDate.enum";
import { useUpsertManagerGlobal } from "../hooks/useUpsertManagerglobal";
import styles from "../styles/upsertManagerglobalScreen.module.css";
import { formatDateFromDate } from "../utils/formatDateFromDate";
import { parseDate } from "../utils/formatDateFromString";
import { getFieldState } from "../utils/getFieldState";

const UpsertManagerglobalScreen = () => {
  const { managerglobalId } = useParams<{ managerglobalId: string }>();

  const {
    upsertManagerglobal,
    loadingManagerglobal,
    loadingRequest,
    imageUrl,
    disabledButton,
    isUpdate,
    fieldsStatus,
    birthdateInputValidationMessage,
    countrySelectValidationMessage,
    loadingCountries,
    countries,
    handleChangeInput,
    handleChangeBirthdateInput,
    handleChangeCountrySelect,
    handleUpsertManagerglobal,
    handleReset,
    handleCancel,
  } = useUpsertManagerGlobal(managerglobalId);

  return loadingCountries || loadingManagerglobal ? (
    <div className={styles.container}>
      <Spinner size={50} />
    </div>
  ) : (
    <div className={styles.container}>
      <Header />
      <div className={styles.cardUpsertManagerglobal}>
        <h2 className={styles.h2}>
          {isUpdate ? "Atualizar Treinador" : "Criar Treinador"}
        </h2>
        <form className={styles.form} onSubmit={handleUpsertManagerglobal}>
          <div className={styles.containerImagePreview}>
            <ImagePreview
              imageUrl={imageUrl}
              backgroundUrl={DEFAULT_MANAGERGLOBAL_IMAGE_URL}
              size={100}
            />
          </div>

          <div className={styles.containerFormGroups}>
            <FormGroup label="Nome" required={true}>
              <Input
                id="name"
                type="text"
                placeholder="Nome"
                value={upsertManagerglobal.name}
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
                value={upsertManagerglobal.imageUrl}
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
                  upsertManagerglobal.birthdate
                    ? parseDate(
                        upsertManagerglobal.birthdate,
                        FormatDateEnum.DASH_YYYY_MM_DD
                      )
                    : undefined
                }
                disabled={loadingRequest}
                validationMessage={birthdateInputValidationMessage}
                fieldState={getFieldState("birthdate", fieldsStatus)}
              />
            </FormGroup>

            <FormGroup label="Nacionalidade" required={true}>
              <Select
                placeholder="Selecione o país"
                value={upsertManagerglobal.countryId}
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
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.button} ${styles.cancelButton}`}
              disabled={loadingRequest}
              onClick={handleCancel}
            >
              Cancelar
            </button>

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
                <span>{isUpdate ? "Salvar Treinador" : "Criar Treinador"}</span>
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

export default UpsertManagerglobalScreen;
