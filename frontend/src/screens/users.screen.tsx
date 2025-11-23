import { TableActionEnum } from "../enums/TableActionEnum";
import { TableHideLevelEnum } from "../enums/TableHideLevelEnum";
import { useUser } from "../hooks/useUser";
import type { TableHeaderType } from "../types/TableHeaderType";
import styles from "../styles/usersScreen.module.css";
import Image from "../components/image/image";
import { DEFAULT_USER_IMAGE_URL } from "../config/constants";
import CountryIcon from "../components/icons/country.icon";
import Spinner from "../components/spinner/spinner";
import Table from "../components/table/table";
import Modal from "../components/modal/modal";
import Header from "../components/header/header";

const UsersScreen = () => {
  const {
    loadingUsers,
    loadingRequest,
    loadingFetchs,
    users,
    handleSearch,
    handleDelete,
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
  } = useUser();

  const tableHeaders: TableHeaderType[] = [
    { th: "Nome", td: "name" },
    { th: "País", td: "country", hideAtWith: TableHideLevelEnum.at500 },
  ];

  const tableData = users.map((user) => ({
    id: user.id,
    name: (
      <div className={styles.imageWithName}>
        <Image src={user.imageUrl || DEFAULT_USER_IMAGE_URL} size={20} />{" "}
        {user.name}
      </div>
    ),
    country: (
      <div className={styles.imageWithName}>
        <CountryIcon countryCode={user.country!.code} size={20} />{" "}
        {user.country!.name}
      </div>
    ),
    actions: [TableActionEnum.Delete],
  }));

  return loadingUsers ? (
    <div className={styles.container}>
      <Spinner size={50} />
    </div>
  ) : (
    <div className={styles.container}>
      <Header />
      <div className={styles.cardUsers}>
        <h2 className={styles.h2}>Usuários</h2>
        <div className={styles.containerSearch}>
          <input
            className={styles.input}
            type="text"
            placeholder="Buscar"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Table
          data={tableData}
          headers={tableHeaders}
          handleOpenModalDelete={handleOpenModalDelete}
        />
      </div>

      <Modal
        title="Deletar Usuário"
        children={
          <div>
            Deseja realmente deletar este usuário? Os salvamentos deste usuário
            também serão deletados. Esta ação é irreversível.
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

export default UsersScreen;
