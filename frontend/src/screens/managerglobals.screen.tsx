import { TableHideLevelEnum } from "../enums/TableHideLevelEnum";
import { useManagerglobal } from "../hooks/useManagerglobal";
import type { TableHeaderType } from "../types/TableHeaderType";
import styles from "../styles/managerglobalsScreen.module.css";
import Image from "../components/image/image";
import {
  DEFAULT_MANAGERGLOBAL_IMAGE_URL,
  DEFAULT_TEAMGLOBAL_IMAGE_URL,
} from "../config/constants";
import CountryIcon from "../components/icons/country.icon";
import { TableActionEnum } from "../enums/TableActionEnum";
import Spinner from "../components/spinner/spinner";
import Table from "../components/table/table";
import Modal from "../components/modal/modal";

const ManagerglobalsScreen = () => {
  const {
    loadingManagerglobals,
    loadingRequest,
    managerglobals,
    handleCreate,
    handleSearch,
    handleUpdate,
    handleDelete,
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
  } = useManagerglobal();

  const tableHeaders: TableHeaderType[] = [
    { th: "Nome", td: "name" },
    { th: "Time", td: "teamglobal", hideAtWith: TableHideLevelEnum.at500 },
    { th: "País", td: "country", hideAtWith: TableHideLevelEnum.at700 },
  ];

  const tableData = managerglobals.map((managerglobal) => ({
    id: managerglobal.id,
    name: (
      <div className={styles.imageWithName}>
        <Image
          src={managerglobal.imageUrl || DEFAULT_MANAGERGLOBAL_IMAGE_URL}
          size={20}
        />{" "}
        {managerglobal.name}
      </div>
    ),
    teamglobal: managerglobal.teamglobal ? (
      <div className={styles.imageWithName}>
        <Image
          src={
            managerglobal.teamglobal.imageUrl || DEFAULT_TEAMGLOBAL_IMAGE_URL
          }
          size={20}
        />{" "}
        {managerglobal.teamglobal.name}
      </div>
    ) : null,
    country: (
      <div className={styles.imageWithName}>
        <CountryIcon countryCode={managerglobal.country!.code} size={20} />{" "}
        {managerglobal.country!.name}
      </div>
    ),
    actions: managerglobal.teamglobal
      ? [TableActionEnum.Update]
      : [TableActionEnum.Update, TableActionEnum.Delete],
  }));

  return loadingManagerglobals ? (
    <div className={styles.container}>
      <Spinner size={50} />
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.cardManagerglobals}>
        <h2 className={styles.h2}>Treinadores</h2>
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
            Criar Treinador
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
        title="Deseja realmente excluir este treinador?"
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

export default ManagerglobalsScreen;
