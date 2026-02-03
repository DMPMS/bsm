import { useParams } from "react-router-dom";
import { useUpsertCompetitionglobal } from "../hooks/useUpsertCompetitionglobal";
import type { TableHeaderType } from "../types/TableHeaderType";
import { TableHideLevelEnum } from "../enums/TableHideLevel.enum";
import Country from "../components/country/country";
import ImageLabel from "../components/imageLabel/imageLabel";
import {
  DEFAULT_COMPETITIONGLOBAL_IMAGE_URL,
  DEFAULT_MANAGERGLOBAL_IMAGE_URL,
  DEFAULT_TEAMGLOBAL_IMAGE_URL,
} from "../config/constants";
import styles from "../styles/upsertCompetitionglobalScreen.module.css";
import Spinner from "../components/spinner/spinner";
import Header from "../components/header/header";
import ImagePreview from "../components/imagePreview/imagePreview";
import FormGroup from "../components/formGroup/formGroup";
import Input from "../components/input/input";
import { getFieldState } from "../utils/getFieldState";
import ButtonRadio from "../components/buttonRadio/buttonRadio";
import { SelectTableFilterEnum } from "../enums/SelectTableFilter.enum";
import SelectTable from "../components/selectTable/selectTable";
import { GENERAL_FIELD_VALIDATION_MESSAGES } from "../utils/messages";
import { hasRuleConflict, hasRuleRequirements } from "../utils/ruleRelations";
import Modal from "../components/modal/modal";
import { KeyboardKeyEnum } from "../enums/KeyboardKey.enum";
import DocumentIcon from "../components/icons/document.icon";
import { ModalSizeEnum } from "../enums/ModalSize.enum";

const UpsertCompetitionglobalScreen = () => {
  const { competitionglobalId } = useParams<{ competitionglobalId: string }>();

  const {
    competitionglobal,
    upsertCompetitionglobal,
    loadingCompetitionglobal,
    loadingRequest,
    disabledButton,
    isUpdate,
    fieldsStatus,
    selectedRule,
    rulesFilter,
    teamglobalsFilter,
    ruleSelectValidationMessage,
    teamglobalsSelectValidationMessage,
    loadingRules,
    rules,
    loadingTeamglobals,
    teamglobals,
    ruleModalDescription,
    handleSearchRules,
    handleSearchTeamglobals,
    setRulesFilter,
    setTeamglobalsFilter,
    handleChangeInput,
    handleChangeRuleSelect,
    handleChangeTeamglobalsSelect,
    handleUpsertCompetitionglobal,
    handleReset,
    handleCancel,
    handlePreventSubmitOnEnter,
    handleOpenRuleModalDescription,
    handleCloseRuleModalDescription,
  } = useUpsertCompetitionglobal(competitionglobalId);

  const rulesTableHeaders: TableHeaderType[] = [
    { th: "Nome", td: "name" },
    {
      th: "Número de Times",
      td: "numberOfTeams",
      hideAtWidth: TableHideLevelEnum.at600,
    },
    { th: "País", td: "country", hideAtWidth: TableHideLevelEnum.at700 },
    {
      th: "Descrição",
      td: "description",
      hideAtWidth: TableHideLevelEnum.at500,
    },
    {
      th: "Competição",
      td: "competitionglobal",
      hideAtWidth: TableHideLevelEnum.at800,
    },
  ];

  const competitionglobalRuleCodes = rules
    .filter((rule) => rule.competitionglobal)
    .map((rule) => rule.code);

  const rulesTableData = rules.map((rule) => {
    const isDisabled = rule.competitionglobal
      ? rule.competitionglobal.id !== competitionglobalId
      : !hasRuleRequirements(rule.code, competitionglobalRuleCodes);

    return {
      id: rule.id,
      name: rule.name,
      numberOfTeams: rule.numberOfTeams,
      country: (
        <Country countryCode={rule.country!.code} name={rule.country!.name} />
      ),
      description: (
        <div className={styles.containerRuleDescription}>
          <button
            type="button"
            className={styles.buttonRuleDescription}
            onClick={() => handleOpenRuleModalDescription(rule.description)}
            onKeyDown={(e) => {
              if (
                e.key === KeyboardKeyEnum.Enter ||
                e.key === KeyboardKeyEnum.Space
              ) {
                e.preventDefault();
                handleOpenRuleModalDescription(rule.description);
              }
            }}
          >
            <DocumentIcon
              size={20}
              circle={true}
              color="var(--color-blue-1)"
              colorHover="var(--color-blue-2)"
              colorDisabled="var(--color-blue-1)"
            />
          </button>
        </div>
      ),
      competitionglobal: rule.competitionglobal ? (
        <ImageLabel
          imageUrl={
            rule.competitionglobal.imageUrl ||
            DEFAULT_COMPETITIONGLOBAL_IMAGE_URL
          }
          name={rule.competitionglobal.name}
        />
      ) : null,
      disabled: isDisabled,
    };
  });

  const teamglobalsTableHeaders: TableHeaderType[] = [
    { th: "Nome", td: "name" },
    {
      th: "Treinador",
      td: "managerglobal",
      hideAtWidth: TableHideLevelEnum.at700,
    },
    { th: "País", td: "country", hideAtWidth: TableHideLevelEnum.at500 },
  ];

  const teamglobalsTableData = teamglobals.map((teamglobal) => {
    const teamglobalRuleCodes = teamglobal.competitionglobalTeamglobals!.map(
      (competitionglobalTeamglobal) =>
        competitionglobalTeamglobal.competitionglobal!.rule!.code,
    );

    const isDisabled =
      !selectedRule || hasRuleConflict(selectedRule.code, teamglobalRuleCodes);

    return {
      id: teamglobal.id,
      name: (
        <ImageLabel
          imageUrl={teamglobal.imageUrl || DEFAULT_TEAMGLOBAL_IMAGE_URL}
          name={teamglobal.name}
        />
      ),
      managerglobal: (
        <ImageLabel
          imageUrl={
            teamglobal.managerglobal!.imageUrl ||
            DEFAULT_MANAGERGLOBAL_IMAGE_URL
          }
          name={teamglobal.managerglobal!.name}
        />
      ),
      country: (
        <Country
          countryCode={teamglobal.country!.code}
          name={teamglobal.country!.name}
        />
      ),
      disabled: isDisabled,
    };
  });

  return loadingRules || loadingTeamglobals || loadingCompetitionglobal ? (
    <div className={styles.container}>
      <Spinner size={50} />
    </div>
  ) : (
    <div className={styles.container}>
      <Header />
      <div className={styles.cardUpsertCompetitionglobal}>
        <h2 className={styles.h2}>
          {isUpdate ? "Atualizar Competição" : "Criar Competição"}
        </h2>
        <form className={styles.form} onSubmit={handleUpsertCompetitionglobal}>
          <div className={styles.containerImagePreview}>
            <ImagePreview
              imageUrl={upsertCompetitionglobal.imageUrl}
              backgroundUrl={DEFAULT_COMPETITIONGLOBAL_IMAGE_URL}
              size={100}
            />
          </div>

          <div className={styles.containerSelectTableRules}>
            <FormGroup label="Regra" required={true}>
              <div className={styles.containerSearchRules}>
                <Input
                  className={styles.input}
                  type="text"
                  placeholder="Buscar por nome"
                  onChange={(e) => handleSearchRules(e.target.value)}
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
                  value={rulesFilter}
                  onChange={(value) =>
                    setRulesFilter(value as SelectTableFilterEnum)
                  }
                />
              </div>

              <SelectTable
                data={
                  isUpdate
                    ? rulesFilter === SelectTableFilterEnum.Selected &&
                      upsertCompetitionglobal.ruleId
                      ? [
                          rulesTableData.find(
                            (rule) =>
                              upsertCompetitionglobal.ruleId === rule.id,
                          )!,
                        ]
                      : rulesFilter === SelectTableFilterEnum.Selected &&
                          !upsertCompetitionglobal.ruleId
                        ? []
                        : rulesTableData.filter(
                            (rule) => rule.id === competitionglobal!.rule!.id,
                          )
                    : rulesFilter === SelectTableFilterEnum.Selected &&
                        upsertCompetitionglobal.ruleId
                      ? [
                          rulesTableData.find(
                            (rule) =>
                              upsertCompetitionglobal.ruleId === rule.id,
                          )!,
                        ]
                      : rulesFilter === SelectTableFilterEnum.Selected &&
                          !upsertCompetitionglobal.ruleId
                        ? []
                        : rulesFilter === SelectTableFilterEnum.Available
                          ? rulesTableData.filter(
                              (rule) => rule.disabled === false,
                            )
                          : rulesTableData
                }
                headers={rulesTableHeaders}
                values={
                  upsertCompetitionglobal.ruleId
                    ? [upsertCompetitionglobal.ruleId]
                    : []
                }
                onChange={(values: string[]) =>
                  handleChangeRuleSelect(values[0])
                }
                disabled={loadingRequest}
                multiple={false}
                validationMessage={ruleSelectValidationMessage}
                fieldState={getFieldState("ruleIds", fieldsStatus)}
              />
            </FormGroup>
          </div>

          <div className={styles.containerFormGroups}>
            <FormGroup label="Nome" required={true}>
              <Input
                id="name"
                type="text"
                placeholder="Nome"
                value={upsertCompetitionglobal.name}
                onChange={(e) => handleChangeInput(e, "name")}
                disabled={loadingRequest}
                fieldState={getFieldState("name", fieldsStatus)}
              />
            </FormGroup>

            <FormGroup label="Temporada" required={true}>
              <Input
                id="season"
                type="text"
                className={styles.season}
                placeholder="Temporada"
                value={upsertCompetitionglobal.season}
                onChange={(e) => handleChangeInput(e, "season")}
                disabled={loadingRequest}
                fieldState={getFieldState("season", fieldsStatus)}
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
                value={upsertCompetitionglobal.imageUrl}
                onChange={(e) => handleChangeInput(e, "imageUrl")}
                disabled={loadingRequest}
                fieldState={getFieldState("imageUrl", fieldsStatus)}
              />
            </FormGroup>
          </div>

          <div className={styles.containerSelectTableTeamglobals}>
            <FormGroup
              label="Times"
              required={true}
              tooltip={
                selectedRule
                  ? GENERAL_FIELD_VALIDATION_MESSAGES.OPTIONS(
                      selectedRule.numberOfTeams,
                      selectedRule.numberOfTeams,
                    )
                  : "Selecione a regra."
              }
              tooltipContent={
                selectedRule && (
                  <div className={styles.tooltipContentTeamglobals}>
                    {upsertCompetitionglobal.teamglobalIds.length} /{" "}
                    {selectedRule.numberOfTeams}{" "}
                    {`(mín. ${selectedRule.numberOfTeams})`}
                  </div>
                )
              }
            >
              <div className={styles.containerSearchTeamglobals}>
                <Input
                  className={styles.input}
                  type="text"
                  placeholder="Buscar por nome"
                  onChange={(e) => handleSearchTeamglobals(e.target.value)}
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
                  value={teamglobalsFilter}
                  onChange={(value) =>
                    setTeamglobalsFilter(value as SelectTableFilterEnum)
                  }
                />
              </div>

              <SelectTable
                data={
                  teamglobalsFilter === SelectTableFilterEnum.Selected
                    ? teamglobalsTableData.filter((teamglobal) =>
                        upsertCompetitionglobal.teamglobalIds.includes(
                          teamglobal.id,
                        ),
                      )
                    : teamglobalsFilter === SelectTableFilterEnum.Available
                      ? teamglobalsTableData.filter(
                          (teamglobal) => teamglobal.disabled === false,
                        )
                      : teamglobalsTableData
                }
                headers={teamglobalsTableHeaders}
                values={upsertCompetitionglobal.teamglobalIds}
                onChange={handleChangeTeamglobalsSelect}
                disabled={loadingRequest}
                validationMessage={teamglobalsSelectValidationMessage}
                fieldState={getFieldState("teamglobalIds", fieldsStatus)}
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
                {isUpdate ? "Salvar Competição" : "Criar Competição"}
                {loadingRequest && (
                  <Spinner size={12} className={styles.spinner} />
                )}
              </span>
            </button>
          </div>
        </form>
      </div>

      <Modal
        title="Descrição"
        size={ModalSizeEnum.VeryLarge}
        children={<div>{ruleModalDescription}</div>}
        isOpen={!!ruleModalDescription}
        onCancel={handleCloseRuleModalDescription}
        cancelText="Fechar"
      />
    </div>
  );
};

export default UpsertCompetitionglobalScreen;
