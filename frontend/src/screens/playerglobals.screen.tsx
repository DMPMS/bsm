import Image from "../components/image/image";
import { TableActionEnum } from "../enums/TableActionEnum";
import { TableHideLevelEnum } from "../enums/TableHideLevelEnum";
import { usePlayerglobal } from "../hooks/usePlayerglobal";
import type { TableHeaderType } from "../types/TableHeaderType";
import styles from "../styles/playerglobalsScreen.module.css";
import { DEFAULT_PLAYERGLOBAL_IMAGE_URL } from "../config/constants";
import CountryIcon from "../components/icons/country.icon";
import Spinner from "../components/spinner/spinner";
import Table from "../components/table/table";
import Modal from "../components/modal/modal";
import Header from "../components/header/header";

const PlayerglobalsScreen = () => {
  const {
    loadingPlayerglobals,
    loadingRequest,
    playerglobals,
    handleCreate,
    handleSearch,
    handleUpdate,
    handleDelete,
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
  } = usePlayerglobal();

  const tableHeaders: TableHeaderType[] = [
    { th: "Nome", td: "name" },
    { th: "Time", td: "teamglobal", hideAtWith: TableHideLevelEnum.at500 },
    { th: "País", td: "country", hideAtWith: TableHideLevelEnum.at700 },
  ];

  const tableData = playerglobals.map((playerglobal) => ({
    id: playerglobal.id,
    name: (
      <div className={styles.imageWithName}>
        <Image
          src={playerglobal.imageUrl || DEFAULT_PLAYERGLOBAL_IMAGE_URL}
          size={20}
        />{" "}
        {playerglobal.name}
      </div>
    ),
    teamglobal: playerglobal.teamglobal ? (
      <div className={styles.imageWithName}>
        <Image
          src={
            playerglobal.teamglobal.imageUrl || DEFAULT_PLAYERGLOBAL_IMAGE_URL
          }
          size={20}
        />{" "}
        {playerglobal.teamglobal.name}
      </div>
    ) : null,
    country: (
      <div className={styles.imageWithName}>
        <CountryIcon countryCode={playerglobal.country!.code} size={20} />{" "}
        {playerglobal.country!.name}
      </div>
    ),
    actions: playerglobal.teamglobal
      ? [TableActionEnum.Update]
      : [TableActionEnum.Update, TableActionEnum.Delete],
  }));

  return loadingPlayerglobals ? (
    <div className={styles.container}>
      <Spinner size={50} />
    </div>
  ) : (
    <div className={styles.container}>
      <Header />
      <div className={styles.cardPlayerglobals}>
        <h2 className={styles.h2}>Jogadores</h2>
        <div className={styles.containerSearchAndCreate}>
          <input
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
            Criar Jogador
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
        title="Deseja realmente excluir este jogador?"
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

export default PlayerglobalsScreen;
