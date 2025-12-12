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
import Position from "../components/position/position";
import Input from "../components/input/input";

const PlayerglobalsScreen = () => {
  const {
    loadingPlayerglobals,
    loadingRequest,
    loadingFetchs,
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
    { th: "Geral", td: "overall", hideAtWith: TableHideLevelEnum.at300 },
    {
      th: "Posições Principais",
      td: "primaryPositions",
      hideAtWith: TableHideLevelEnum.at400,
    },
    {
      th: "Posições Secundárias",
      td: "secondaryPositions",
      hideAtWith: TableHideLevelEnum.at600,
    },
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
    overall: playerglobal.overall,
    primaryPositions: (
      <div className={styles.positions}>
        {playerglobal
          .playerglobalPositions!.filter(
            (playerglobalPosition) => playerglobalPosition.isPrimary
          )
          .map((playerglobalPosition) => (
            <Position
              key={playerglobalPosition.id}
              abbreviation={playerglobalPosition.position!.abbreviation}
              area={playerglobalPosition.position!.area}
            />
          ))}
      </div>
    ),
    secondaryPositions: (
      <div className={styles.positions}>
        {playerglobal
          .playerglobalPositions!.filter(
            (playerglobalPosition) => !playerglobalPosition.isPrimary
          )
          .map((playerglobalPosition) => (
            <Position
              key={playerglobalPosition.id}
              abbreviation={playerglobalPosition.position!.abbreviation}
              area={playerglobalPosition.position!.area}
            />
          ))}
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
        title="Deletar Jogador"
        children={
          <div>
            Deseja realmente deletar este jogador? Esta ação é irreversível.
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

export default PlayerglobalsScreen;
