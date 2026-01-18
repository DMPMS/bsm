import { TableActionEnum } from "../enums/TableAction.enum";
import { TableHideLevelEnum } from "../enums/TableHideLevel.enum";
import { usePlayerglobal } from "../hooks/usePlayerglobal";
import type { TableHeaderType } from "../types/TableHeaderType";
import styles from "../styles/playerglobalsScreen.module.css";
import {
  DEFAULT_PLAYERGLOBAL_IMAGE_URL,
  DEFAULT_TEAMGLOBAL_IMAGE_URL,
} from "../config/constants";
import Spinner from "../components/spinner/spinner";
import Table from "../components/table/table";
import Modal from "../components/modal/modal";
import Header from "../components/header/header";
import Position from "../components/position/position";
import Input from "../components/input/input";
import ImageLabel from "../components/imageLabel/imageLabel";
import Country from "../components/country/country";

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

  const tableData = playerglobals.map((playerglobal) => ({
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
            placeholder="Buscar por nome"
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
