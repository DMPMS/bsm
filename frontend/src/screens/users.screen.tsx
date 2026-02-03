import { TableActionEnum } from "../enums/TableAction.enum";
import { TableHideLevelEnum } from "../enums/TableHideLevel.enum";
import { useUser } from "../hooks/useUser";
import type { TableHeaderType } from "../types/TableHeaderType";
import styles from "../styles/usersScreen.module.css";
import { DEFAULT_USER_IMAGE_URL } from "../config/constants";
import Spinner from "../components/spinner/spinner";
import Table from "../components/table/table";
import Modal from "../components/modal/modal";
import Header from "../components/header/header";
import Input from "../components/input/input";
import ImageLabel from "../components/imageLabel/imageLabel";
import Country from "../components/country/country";

const UsersScreen = () => {
  const {
    loadingUsers,
    loadingRequest,
    loadingFetchs,
    users,
    openModalDelete,
    handleSearch,
    handleDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
  } = useUser();

  const tableHeaders: TableHeaderType[] = [
    { th: "Nome", td: "name" },
    { th: "País", td: "country", hideAtWidth: TableHideLevelEnum.at500 },
  ];

  const tableData = users.map((user) => ({
    id: user.id,
    name: (
      <ImageLabel
        imageUrl={user.imageUrl || DEFAULT_USER_IMAGE_URL}
        name={user.name}
      />
    ),
    country: (
      <Country countryCode={user.country!.code} name={user.country!.name} />
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
          <Input
            className={styles.input}
            type="text"
            placeholder="Buscar por nome"
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
