import Country from "../components/country/country";
import ImageLabel from "../components/imageLabel/imageLabel";
import {
  CURRENT_DATE,
  DEFAULT_COMPETITIONGLOBAL_IMAGE_URL,
} from "../config/constants";
import { TableActionEnum } from "../enums/TableAction.enum";
import { TableHideLevelEnum } from "../enums/TableHideLevel.enum";
import { useCompetitionglobal } from "../hooks/useCompetitionglobal";
import type { TableHeaderType } from "../types/TableHeaderType";
import styles from "../styles/competitionglobalsScreen.module.css";
import Spinner from "../components/spinner/spinner";
import Header from "../components/header/header";
import Input from "../components/input/input";
import Table from "../components/table/table";
import Modal from "../components/modal/modal";
import { hasRuleDependents } from "../utils/ruleRelations";
import { RuleCodeEnum } from "../enums/RuleCode.enum";
import { SeasonOffsetEnum } from "../enums/SeasonOffset.enum";

const CompetitionglobalsScreen = () => {
  const {
    loadingCompetitionglobals,
    loadingRequest,
    loadingFetchs,
    competitionglobals,
    loadingSettingsglobal,
    settingsglobal,
    openModalDelete,
    handleCreate,
    handleSearch,
    handleUpdate,
    handleDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
  } = useCompetitionglobal();

  const tableHeaders: TableHeaderType[] = [
    { th: "Nome", td: "name" },
    { th: "Temporada", td: "season", hideAtWidth: TableHideLevelEnum.at700 },
    {
      th: "Regra",
      td: "rule",
      hideAtWidth: TableHideLevelEnum.at500,
    },
    { th: "País", td: "country", hideAtWidth: TableHideLevelEnum.at400 },
  ];

  const tableData = competitionglobals.map((competitionglobal) => {
    const canDelete =
      !hasRuleDependents(
        competitionglobal.rule!.code,
        competitionglobals.map((cg) => cg.rule!.code),
      ) && competitionglobal.rule!.code !== RuleCodeEnum.BrazilianLeagueA;

    return {
      id: competitionglobal.id,
      name: (
        <ImageLabel
          imageUrl={
            competitionglobal.imageUrl || DEFAULT_COMPETITIONGLOBAL_IMAGE_URL
          }
          name={competitionglobal.name}
        />
      ),
      season:
        CURRENT_DATE.getFullYear() +
        (settingsglobal?.seasonOffset || SeasonOffsetEnum.CurrentYear),
      rule: competitionglobal.rule!.name,
      country: (
        <Country
          countryCode={competitionglobal.rule!.country!.code}
          name={competitionglobal.rule!.country!.name}
        />
      ),
      actions: [
        TableActionEnum.Update,
        canDelete ? TableActionEnum.Delete : null,
      ].filter(Boolean),
    };
  });

  return loadingSettingsglobal || loadingCompetitionglobals ? (
    <div className={styles.container}>
      <Spinner size={50} />
    </div>
  ) : (
    <div className={styles.container}>
      <Header />
      <div className={styles.cardCompetitionglobals}>
        <h2 className={styles.h2}>Competições</h2>
        <div className={styles.containerSearchAndCreate}>
          <Input
            className={styles.input}
            type="text"
            placeholder="Buscar por nome"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button
            className={styles.button}
            type="button"
            onClick={handleCreate}
          >
            Criar Competição
          </button>
        </div>
        <Table
          data={tableData}
          headers={tableHeaders}
          handleUpdate={handleUpdate}
          handleOpenModalDelete={handleOpenModalDelete}
        />
      </div>

      <Modal
        title="Deletar Competição"
        children={
          <div>
            Deseja realmente deletar esta competição? Os times desta competição
            ficarão disponíveis para outras competições. Esta ação é
            irreversível.
          </div>
        }
        isOpen={openModalDelete}
        onConfirm={handleDelete}
        onCancel={handleCloseModalDelete}
        loading={loadingRequest || loadingFetchs}
        danger={true}
      />
    </div>
  );
};

export default CompetitionglobalsScreen;
