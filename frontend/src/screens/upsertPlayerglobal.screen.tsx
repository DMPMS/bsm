import { useParams } from "react-router-dom";
import styles from "../styles/upsertPlayerglobalScreen.module.css";
import { useUpsertPlayerglobal } from "../hooks/useUpsertPlayerglobal";
import Spinner from "../components/spinner/spinner";
import Header from "../components/header/header";
import ImagePreview from "../components/imagePreview/imagePreview";
import {
  CURRENT_DATE,
  DEFAULT_PLAYERGLOBAL_IMAGE_URL,
  PLAYERGLOBAL,
} from "../config/constants";
import FormGroup from "../components/formGroup/formGroup";
import Input from "../components/input/input";
import { getFieldState } from "../utils/getFieldState";
import { formatDateFromDate } from "../utils/formatDateFromDate";
import { FormatDateEnum } from "../enums/FormatDate.enum";
import DatePicker from "../components/datePicker/datePicker";
import { parseDate } from "../utils/formatDateFromString";
import Select from "../components/select/select";
import Country from "../components/country/country";
import InputNumber from "../components/inputNumber/inputNumber";
import SelectMultiple from "../components/selectMultiple/selectMultiple";
import { GENERAL_FIELD_VALIDATION_MESSAGES } from "../utils/messages";
import PositionLabel from "../components/positionLabel/positionLabel";

const UpsertPlayerglobalScreen = () => {
  const { playerglobalId } = useParams<{ playerglobalId: string }>();

  const {
    upsertPlayerglobal,
    loadingPlayerglobal,
    loadingRequest,
    disabledButton,
    isUpdate,
    fieldsStatus,
    birthdateInputValidationMessage,
    countrySelectValidationMessage,
    primaryPositionSelectValidationMessage,
    secondaryPositionSelectValidationMessage,
    loadingCountries,
    countries,
    loadingPositions,
    positions,
    handleChangeInput,
    handleChangeBirthdateInput,
    handleChangeCountrySelect,
    handleChangePrimaryPositionsSelect,
    handleChangeSecondaryPositionsSelect,
    handleUpsertPlayerglobal,
    handleReset,
    handleCancel,
  } = useUpsertPlayerglobal(playerglobalId);

  return loadingCountries || loadingPositions || loadingPlayerglobal ? (
    <div className={styles.container}>
      <Spinner size={50} />
    </div>
  ) : (
    <div className={styles.container}>
      <Header />
      <div className={styles.cardUpsertPlayerglobal}>
        <h2 className={styles.h2}>
          {isUpdate ? "Atualizar Jogador" : "Criar Jogador"}
        </h2>
        <form className={styles.form} onSubmit={handleUpsertPlayerglobal}>
          <div className={styles.containerImagePreview}>
            <ImagePreview
              imageUrl={upsertPlayerglobal.imageUrl}
              backgroundUrl={DEFAULT_PLAYERGLOBAL_IMAGE_URL}
              size={100}
            />
          </div>

          <div className={styles.containerFormGroups}>
            <FormGroup label="Nome" required={true}>
              <Input
                id="name"
                type="text"
                placeholder="Nome"
                value={upsertPlayerglobal.name}
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
                value={upsertPlayerglobal.imageUrl}
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
                FormatDateEnum.SLASH_DD_MM_YYYY,
              )}.`}
            >
              <DatePicker
                onChange={handleChangeBirthdateInput}
                value={
                  upsertPlayerglobal.birthdate
                    ? parseDate(
                        upsertPlayerglobal.birthdate,
                        FormatDateEnum.DASH_YYYY_MM_DD,
                      )
                    : undefined
                }
                disabled={loadingRequest}
                validationMessage={birthdateInputValidationMessage}
                fieldState={getFieldState("birthdate", fieldsStatus)}
              />
            </FormGroup>

            <FormGroup label="Geral" required={true}>
              <InputNumber
                id="overall"
                value={upsertPlayerglobal.overall}
                onChange={(e) => handleChangeInput(e, "overall")}
                disabled={loadingRequest}
                fieldState={getFieldState("overall", fieldsStatus)}
                decimalPrecision={0}
              />
            </FormGroup>

            <FormGroup
              label="Posições Primárias"
              required={true}
              tooltip={GENERAL_FIELD_VALIDATION_MESSAGES.OPTIONS(
                PLAYERGLOBAL.PRIMARY_POSITIONS.MIN,
                PLAYERGLOBAL.PRIMARY_POSITIONS.MAX,
              )}
              tooltipContent={
                <div className={styles.tooltipContentPositions}>
                  {upsertPlayerglobal.primaryPositionIds.length} /{" "}
                  {PLAYERGLOBAL.PRIMARY_POSITIONS.MAX}{" "}
                  {`(mín. ${PLAYERGLOBAL.PRIMARY_POSITIONS.MIN})`}
                </div>
              }
            >
              <SelectMultiple
                placeholder="Selecione as posições"
                values={upsertPlayerglobal.primaryPositionIds}
                onChange={(values: (string | number)[]) =>
                  handleChangePrimaryPositionsSelect(values as string[])
                }
                options={positions.map((position) => ({
                  value: position.id,
                  name: position.name,
                  disabled: upsertPlayerglobal.secondaryPositionIds.includes(
                    position.id,
                  ),
                  display: <PositionLabel position={position} />,
                }))}
                disabled={loadingRequest}
                validationMessage={primaryPositionSelectValidationMessage}
                fieldState={getFieldState("primaryPositionIds", fieldsStatus)}
              />
            </FormGroup>

            <FormGroup
              label="Posições Secundárias"
              tooltip={GENERAL_FIELD_VALIDATION_MESSAGES.OPTIONS(
                PLAYERGLOBAL.SECONDARY_POSITIONS.MIN,
                PLAYERGLOBAL.SECONDARY_POSITIONS.MAX,
              )}
              tooltipContent={
                <div className={styles.tooltipContentPositions}>
                  {upsertPlayerglobal.secondaryPositionIds.length} /{" "}
                  {PLAYERGLOBAL.SECONDARY_POSITIONS.MAX}
                </div>
              }
            >
              <SelectMultiple
                placeholder="Selecione as posições"
                values={upsertPlayerglobal.secondaryPositionIds}
                onChange={(values: (string | number)[]) =>
                  handleChangeSecondaryPositionsSelect(values as string[])
                }
                options={positions.map((position) => ({
                  value: position.id,
                  name: position.name,
                  disabled: upsertPlayerglobal.primaryPositionIds.includes(
                    position.id,
                  ),
                  display: <PositionLabel position={position} />,
                }))}
                disabled={loadingRequest}
                validationMessage={secondaryPositionSelectValidationMessage}
                fieldState={getFieldState("secondaryPositionIds", fieldsStatus)}
              />
            </FormGroup>

            <FormGroup label="País" required={true}>
              <Select
                placeholder="Selecione o país"
                value={upsertPlayerglobal.countryId}
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
                {isUpdate ? "Salvar Jogador" : "Criar Jogador"}
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

export default UpsertPlayerglobalScreen;
