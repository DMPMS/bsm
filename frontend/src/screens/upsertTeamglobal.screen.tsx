import { useParams } from "react-router-dom";
import { useUpsertTeamglobal } from "../hooks/useUpsertTeamglobal";
import styles from "../styles/upsertTeamglobalScreen.module.css";
import Spinner from "../components/spinner/spinner";
import Header from "../components/header/header";
import ImagePreview from "../components/imagePreview/imagePreview";
import {
  DEFAULT_MANAGERGLOBAL_IMAGE_URL,
  DEFAULT_PLAYERGLOBAL_IMAGE_URL,
  DEFAULT_TEAMGLOBAL_IMAGE_URL,
  TEAMGLOBAL,
} from "../config/constants";
import FormGroup from "../components/formGroup/formGroup";
import Input from "../components/input/input";
import { getFieldState } from "../utils/getFieldState";
import Select from "../components/select/select";
import Country from "../components/country/country";
import type { TableHeaderType } from "../types/TableHeaderType";
import { TableHideLevelEnum } from "../enums/TableHideLevel.enum";
import Position from "../components/position/position";
import SelectTable from "../components/selectTable/selectTable";
import ButtonRadio from "../components/buttonRadio/buttonRadio";
import { GENERAL_FIELD_VALIDATION_MESSAGES } from "../utils/messages";
import { SelectTableFilterEnum } from "../enums/SelectTableFilter.enum";
import ImageLabel from "../components/imageLabel/imageLabel";

const UpsertTeamglobalScreen = () => {
  const { teamglobalId } = useParams<{ teamglobalId: string }>();

  const {
    upsertTeamglobal,
    loadingTeamglobal,
    loadingRequest,
    disabledButton,
    isUpdate,
    fieldsStatus,
    managerglobalsFilter,
    playerglobalsFilter,
    countrySelectValidationMessage,
    managerglobalSelectValidationMessage,
    playerglobalsSelectValidationMessage,
    loadingCountries,
    countries,
    loadingManagerglobals,
    managerglobalsFiltered,
    loadingPlayerglobals,
    playerglobalsFiltered,
    handleSearchManagerglobals,
    handleSearchPlayerglobals,
    setManagerglobalsFilter,
    setPlayerglobalsFilter,
    handleChangeInput,
    handleChangeCountrySelect,
    handleChangeManagerglobalSelect,
    handleChangePlayerglobalsSelect,
    handleUpsertTeamglobal,
    handleReset,
    handleCancel,
    handlePreventSubmitOnEnter,
  } = useUpsertTeamglobal(teamglobalId);

  const managerglobalsTableHeaders: TableHeaderType[] = [
    { th: "Nome", td: "name" },
    { th: "Time", td: "teamglobal", hideAtWidth: TableHideLevelEnum.at500 },
    { th: "País", td: "country", hideAtWidth: TableHideLevelEnum.at700 },
  ];

  const managerglobalsTableData = managerglobalsFiltered.map(
    (managerglobal) => {
      const isDisabled = managerglobal.teamglobal
        ? managerglobal.teamglobal.id === teamglobalId
          ? false
          : true
        : false;

      return {
        id: managerglobal.id,
        name: (
          <ImageLabel
            imageUrl={managerglobal.imageUrl || DEFAULT_MANAGERGLOBAL_IMAGE_URL}
            name={managerglobal.name}
          />
        ),
        teamglobal: managerglobal.teamglobal ? (
          <ImageLabel
            imageUrl={
              managerglobal.teamglobal.imageUrl || DEFAULT_TEAMGLOBAL_IMAGE_URL
            }
            name={managerglobal.teamglobal.name}
          />
        ) : null,
        country: (
          <Country
            countryCode={managerglobal.country!.code}
            name={managerglobal.country!.name}
          />
        ),
        disabled: isDisabled,
      };
    },
  );

  const playerglobalsTableHeaders: TableHeaderType[] = [
    { th: "Nome", td: "name" },
    { th: "Geral", td: "overall", hideAtWidth: TableHideLevelEnum.at300 },
    {
      th: "Posições Principais",
      td: "primaryPositions",
      hideAtWidth: TableHideLevelEnum.at400,
    },
    {
      th: "Posições Secundárias",
      td: "secondaryPositions",
      hideAtWidth: TableHideLevelEnum.at600,
    },
    { th: "Time", td: "teamglobal", hideAtWidth: TableHideLevelEnum.at500 },
    { th: "País", td: "country", hideAtWidth: TableHideLevelEnum.at700 },
  ];

  const playerglobalsTableData = playerglobalsFiltered.map((playerglobal) => {
    const isDisabled = playerglobal.teamglobal
      ? playerglobal.teamglobal.id === teamglobalId
        ? false
        : true
      : false;

    return {
      id: playerglobal.id,
      name: (
        <ImageLabel
          imageUrl={playerglobal.imageUrl || DEFAULT_PLAYERGLOBAL_IMAGE_URL}
          name={playerglobal.name}
        />
      ),
      overall: playerglobal.overall,
      primaryPositions: (
        <div className={styles.positions}>
          {playerglobal
            .playerglobalPositions!.filter(
              (playerglobalPosition) => playerglobalPosition.isPrimary,
            )
            .map((playerglobalPosition) => (
              <Position
                key={playerglobalPosition.id}
                position={playerglobalPosition.position!}
              />
            ))}
        </div>
      ),
      secondaryPositions: (
        <div className={styles.positions}>
          {playerglobal
            .playerglobalPositions!.filter(
              (playerglobalPosition) => !playerglobalPosition.isPrimary,
            )
            .map((playerglobalPosition) => (
              <Position
                key={playerglobalPosition.id}
                position={playerglobalPosition.position!}
              />
            ))}
        </div>
      ),
      teamglobal: playerglobal.teamglobal ? (
        <ImageLabel
          imageUrl={
            playerglobal.teamglobal.imageUrl || DEFAULT_TEAMGLOBAL_IMAGE_URL
          }
          name={playerglobal.teamglobal.name}
        />
      ) : null,
      country: (
        <Country
          countryCode={playerglobal.country!.code}
          name={playerglobal.country!.name}
        />
      ),
      disabled: isDisabled,
    };
  });

  return loadingCountries ||
    loadingManagerglobals ||
    loadingPlayerglobals ||
    loadingTeamglobal ? (
    <div className={styles.container}>
      <Spinner size={50} />
    </div>
  ) : (
    <div className={styles.container}>
      <Header loading={loadingRequest} />
      <div className={styles.cardUpsertTeamglobal}>
        <h2 className={styles.h2}>
          {isUpdate ? "Atualizar Time" : "Criar Time"}
        </h2>
        <form className={styles.form} onSubmit={handleUpsertTeamglobal}>
          <div className={styles.containerImagePreview}>
            <ImagePreview
              imageUrl={upsertTeamglobal.imageUrl}
              backgroundUrl={DEFAULT_TEAMGLOBAL_IMAGE_URL}
              size={100}
            />
          </div>

          <div className={styles.containerFormGroups}>
            <FormGroup label="Nome" required={true}>
              <Input
                id="name"
                type="text"
                placeholder="Nome"
                value={upsertTeamglobal.name}
                onChange={(e) => handleChangeInput(e, "name")}
                disabled={loadingRequest}
                fieldState={getFieldState("name", fieldsStatus)}
              />
            </FormGroup>

            <FormGroup label="Abreviação" required={true}>
              <Input
                id="abbreviation"
                type="text"
                className={styles.abbreviation}
                placeholder="ABREVIAÇÃO"
                value={upsertTeamglobal.abbreviation}
                onChange={(e) => handleChangeInput(e, "abbreviation")}
                disabled={loadingRequest}
                fieldState={getFieldState("abbreviation", fieldsStatus)}
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
                value={upsertTeamglobal.imageUrl}
                onChange={(e) => handleChangeInput(e, "imageUrl")}
                disabled={loadingRequest}
                fieldState={getFieldState("imageUrl", fieldsStatus)}
              />
            </FormGroup>

            <FormGroup label="País" required={true}>
              <Select
                placeholder="Selecione o país"
                value={upsertTeamglobal.countryId}
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

          <div className={styles.containerSelectTables}>
            <FormGroup label="Treinador" required={true}>
              <div className={styles.containerSearchManagerglobals}>
                <Input
                  className={styles.input}
                  type="text"
                  placeholder="Buscar por nome"
                  onChange={(e) => handleSearchManagerglobals(e.target.value)}
                  onKeyDown={(e) => handlePreventSubmitOnEnter(e)}
                />

                <ButtonRadio
                  className={styles.buttonRadio}
                  options={[
                    { value: SelectTableFilterEnum.All, label: "Todos" },
                    {
                      value: SelectTableFilterEnum.Available,
                      label: "Disponíveis",
                    },
                    {
                      value: SelectTableFilterEnum.Selected,
                      label: "Selecionado",
                    },
                  ]}
                  value={managerglobalsFilter}
                  onChange={(value) =>
                    setManagerglobalsFilter(value as SelectTableFilterEnum)
                  }
                />
              </div>

              <SelectTable
                data={
                  managerglobalsFilter === SelectTableFilterEnum.Selected &&
                  upsertTeamglobal.managerglobalId
                    ? [
                        managerglobalsTableData.find(
                          (managerglobal) =>
                            upsertTeamglobal.managerglobalId ===
                            managerglobal.id,
                        )!,
                      ]
                    : managerglobalsFilter === SelectTableFilterEnum.Selected &&
                        !upsertTeamglobal.managerglobalId
                      ? []
                      : managerglobalsFilter === SelectTableFilterEnum.Available
                        ? managerglobalsTableData.filter(
                            (managerglobal) => managerglobal.disabled === false,
                          )
                        : managerglobalsTableData
                }
                headers={managerglobalsTableHeaders}
                values={
                  upsertTeamglobal.managerglobalId
                    ? [upsertTeamglobal.managerglobalId]
                    : []
                }
                onChange={(values: string[]) =>
                  handleChangeManagerglobalSelect(values[0])
                }
                disabled={loadingRequest}
                multiple={false}
                validationMessage={managerglobalSelectValidationMessage}
                fieldState={getFieldState("managerglobalIds", fieldsStatus)}
              />
            </FormGroup>
            <FormGroup
              label="Jogadores"
              required={true}
              tooltip={GENERAL_FIELD_VALIDATION_MESSAGES.OPTIONS(
                TEAMGLOBAL.PLAYERGLOBALS.MIN,
                TEAMGLOBAL.PLAYERGLOBALS.MAX,
              )}
              tooltipContent={
                <div className={styles.tooltipContentPlayerglobals}>
                  {upsertTeamglobal.playerglobalIds.length} /{" "}
                  {TEAMGLOBAL.PLAYERGLOBALS.MAX}{" "}
                  {`(mín. ${TEAMGLOBAL.PLAYERGLOBALS.MIN})`}
                </div>
              }
            >
              <div className={styles.containerSearchPlayerglobals}>
                <Input
                  className={styles.input}
                  type="text"
                  placeholder="Buscar por nome"
                  onChange={(e) => handleSearchPlayerglobals(e.target.value)}
                  onKeyDown={(e) => handlePreventSubmitOnEnter(e)}
                />

                <ButtonRadio
                  className={styles.buttonRadio}
                  options={[
                    { value: SelectTableFilterEnum.All, label: "Todos" },
                    {
                      value: SelectTableFilterEnum.Available,
                      label: "Disponíveis",
                    },
                    {
                      value: SelectTableFilterEnum.Selected,
                      label: "Selecionados",
                    },
                  ]}
                  value={playerglobalsFilter}
                  onChange={(value) =>
                    setPlayerglobalsFilter(value as SelectTableFilterEnum)
                  }
                />
              </div>

              <SelectTable
                data={
                  playerglobalsFilter === SelectTableFilterEnum.Selected
                    ? playerglobalsTableData.filter((playerglobal) =>
                        upsertTeamglobal.playerglobalIds.includes(
                          playerglobal.id,
                        ),
                      )
                    : playerglobalsFilter === SelectTableFilterEnum.Available
                      ? playerglobalsTableData.filter(
                          (playerglobal) => playerglobal.disabled === false,
                        )
                      : playerglobalsTableData
                }
                headers={playerglobalsTableHeaders}
                values={upsertTeamglobal.playerglobalIds}
                onChange={handleChangePlayerglobalsSelect}
                disabled={loadingRequest}
                validationMessage={playerglobalsSelectValidationMessage}
                fieldState={getFieldState("playerglobalIds", fieldsStatus)}
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
                {isUpdate ? "Salvar Time" : "Criar Time"}
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

export default UpsertTeamglobalScreen;
