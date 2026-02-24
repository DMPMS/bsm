import Country from "../components/country/country";
import { TableHideLevelEnum } from "../enums/TableHideLevel.enum";
import { useRule } from "../hooks/useRule";
import type { TableHeaderType } from "../types/TableHeaderType";
import styles from "../styles/rulesScreen.module.css";
import { KeyboardKeyEnum } from "../enums/KeyboardKey.enum";
import DocumentIcon from "../components/icons/document.icon";
import ImageLabel from "../components/imageLabel/imageLabel";
import { DEFAULT_COMPETITIONGLOBAL_IMAGE_URL } from "../config/constants";
import Spinner from "../components/spinner/spinner";
import Header from "../components/header/header";
import Input from "../components/input/input";
import Table from "../components/table/table";
import Modal from "../components/modal/modal";
import { ModalSizeEnum } from "../enums/ModalSize.enum";

const RulesScreen = () => {
  const {
    loadingRules,
    rulesFiltered,
    modalDescription,
    handleSearch,
    handleOpenModalDescription,
    handleCloseModalDescription,
  } = useRule();

  const tableHeaders: TableHeaderType[] = [
    { th: "Nome", td: "name" },
    {
      th: "Número de Times",
      td: "numberOfTeams",
      hideAtWidth: TableHideLevelEnum.at800,
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
      hideAtWidth: TableHideLevelEnum.at600,
    },
  ];

  const tableData = rulesFiltered.map((rule) => ({
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
          onClick={() => handleOpenModalDescription(rule.description)}
          onKeyDown={(e) => {
            if (
              e.key === KeyboardKeyEnum.Enter ||
              e.key === KeyboardKeyEnum.Space
            ) {
              e.preventDefault();
              handleOpenModalDescription(rule.description);
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
          rule.competitionglobal.imageUrl || DEFAULT_COMPETITIONGLOBAL_IMAGE_URL
        }
        name={rule.competitionglobal.name}
      />
    ) : null,
  }));

  return loadingRules ? (
    <div className={styles.container}>
      <Spinner size={50} />
    </div>
  ) : (
    <div className={styles.container}>
      <Header />
      <div className={styles.cardRules}>
        <h2 className={styles.h2}>Regras</h2>
        <div className={styles.containerSearch}>
          <Input
            className={styles.input}
            type="text"
            placeholder="Buscar por nome"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Table data={tableData} headers={tableHeaders} />
      </div>

      <Modal
        title="Descrição"
        size={ModalSizeEnum.VeryLarge}
        children={<div>{modalDescription}</div>}
        isOpen={!!modalDescription}
        onCancel={handleCloseModalDescription}
        cancelText="Fechar"
      />
    </div>
  );
};

export default RulesScreen;
