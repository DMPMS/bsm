import Header from "../components/header/header";
import CountryIcon from "../components/icons/country.icon";
import Image from "../components/image/image";
import Input from "../components/input/input";
import Modal from "../components/modal/modal";
import Spinner from "../components/spinner/spinner";
import Table from "../components/table/table";
import {
  DEFAULT_MANAGERGLOBAL_IMAGE_URL,
  DEFAULT_TEAMGLOBAL_IMAGE_URL,
} from "../config/constants";
import { TableActionEnum } from "../enums/TableActionEnum";
import { TableHideLevelEnum } from "../enums/TableHideLevelEnum";
import { useTeamglobal } from "../hooks/useTeamglobal";
import styles from "../styles/teamglobalsScreen.module.css";
import type { TableHeaderType } from "../types/TableHeaderType";

const TeamglobalsScreen = () => {
  const {
    loadingTeamglobals,
    loadingRequest,
    loadingFetchs,
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
      th: "Treinador",
      td: "managerglobal",
      hideAtWith: TableHideLevelEnum.at700,
    },
    { th: "País", td: "country", hideAtWith: TableHideLevelEnum.at500 },
  ];

  const tableData = teamglobals.map((teamglobal) => ({
    id: teamglobal.id,
    name: (
      <div className={styles.imageWithName}>
        <Image
          src={teamglobal.imageUrl || DEFAULT_TEAMGLOBAL_IMAGE_URL}
          size={20}
        />{" "}
        {teamglobal.name}
      </div>
    ),
    managerglobal: (
      <div className={styles.imageWithName}>
        <Image
          src={
            teamglobal.managerglobal!.imageUrl ||
            DEFAULT_MANAGERGLOBAL_IMAGE_URL
          }
          size={20}
        />{" "}
        {teamglobal.managerglobal!.name}
      </div>
    ),
    country: (
      <div className={styles.imageWithName}>
        <CountryIcon countryCode={teamglobal.country!.code} size={20} />{" "}
        {teamglobal.country!.name}
      </div>
    ),
    actions: [TableActionEnum.Update, TableActionEnum.Delete],
  }));

  return loadingTeamglobals ? (
    <div className={styles.container}>
      <Spinner size={50} />
    </div>
  ) : (
    <div className={styles.container}>
      <Header />
      <div className={styles.cardTeamglobals}>
        <h2 className={styles.h2}>Times</h2>
        <div className={styles.containerSearchAndCreate}>
          <Input
            className={styles.input}
            type="text"
            placeholder="Buscar"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button
            className={styles.button}
            type="button"
            onClick={handleCreate}
          >
            Criar Time
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
        title="Deletar Time"
        children={
          <div>
            Deseja realmente deletar este time? Os jogadores e o treinador deste
            time ficarão disponíveis para outros times. Esta ação é
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

export default TeamglobalsScreen;
