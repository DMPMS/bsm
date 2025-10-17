import CountryIcon from "../components/icons/country.icon";
import Image from "../components/image/image";
import Modal from "../components/modal/modal";
import Spinner from "../components/spinner/spinner";
import Table from "../components/table/table";
import { TableActionEnum } from "../enums/TableActionEnum";
import { TableHideLevelEnum } from "../enums/TableHideLevelEnum";
import { useTeamglobal } from "../hooks/useTeamglobal";
import styles from "../styles/teamglobalsScreen.module.css";
import type { TableHeaderType } from "../types/TableHeaderType";

const TeamglobalsScreen = () => {
  const {
    loadingTeamglobals,
    loadingRequest,
    teamglobals,
    handleCreate,
    handleSearch,
    handleUpdate,
    handleDelete,
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
  } = useTeamglobal();

  const tableHeaders: TableHeaderType[] = [
    { th: "Nome", td: "name" },
    {
      th: "Abreviação",
      td: "abbreviation",
      hideAtWith: TableHideLevelEnum.at900,
    },
    { th: "País", td: "country", hideAtWith: TableHideLevelEnum.at700 },
  ];

  const tableActions: TableActionEnum[] = [
    TableActionEnum.Delete,
    TableActionEnum.Update,
  ];

  const tableData = teamglobals.map((teamglobal) => ({
    id: teamglobal.id,
    name: (
      <div className={styles.imageWithName}>
        <Image src={teamglobal.imageUrl || ""} size={20} /> {teamglobal.name}
      </div>
    ),
    abbreviation: teamglobal.abbreviation,
    country: (
      <div className={styles.imageWithName}>
        <CountryIcon countryCode={teamglobal.country!.code} size={20} />{" "}
        {teamglobal.country!.name}
      </div>
    ),
  }));

  return loadingTeamglobals ? (
    <div className={styles.container}>
      <Spinner size={50} />
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.cardTeamglobals}>
        <h2 className={styles.h2}>Times</h2>
        <div className={styles.containerSearchAndCreate}>
          <input
            type="text"
            placeholder="Buscar"
            onChange={(e) => handleSearch(e.target.value)}
            className={styles.input}
          />
          <button
            type="button"
            onClick={handleCreate}
            className={styles.button}
          >
            Criar Time
          </button>
        </div>
        <Table
          data={tableData}
          headers={tableHeaders}
          actions={tableActions}
          handleUpdate={handleUpdate}
          handleOpenModalDelete={handleOpenModalDelete}
        />
      </div>

      <Modal
        title="Deseja realmente excluir esse time?"
        description="Esta ação será irreversível."
        isOpen={openModalDelete}
        onConfirm={handleDelete}
        onClose={handleCloseModalDelete}
        loading={loadingRequest}
        danger={true}
      />
    </div>
  );
};

export default TeamglobalsScreen;
