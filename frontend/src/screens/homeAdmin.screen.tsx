import Header from "../components/header/header";
import CompetitionIcon from "../components/icons/competition.icon";
import ExitIcon from "../components/icons/exit.icon";
import ManagerIcon from "../components/icons/manager.icon";
import PlayerIcon from "../components/icons/player.icon";
import SettingsIcon from "../components/icons/settings.icon";
import TeamIcon from "../components/icons/team.icon";
import ToDoListIcon from "../components/icons/toDoList.icon";
import UserIcon from "../components/icons/user.icon";
import Modal from "../components/modal/modal";
import { useHomeAdmin } from "../hooks/useHomeAdmin";
import styles from "../styles/homeAdminScreen.module.css";

const HomeAdminScreen = () => {
  const {
    isOpenLogoutModal,
    handleClickUsers,
    handleClickPlayerglobals,
    handleClickManagerglobals,
    handleClickTeamglobals,
    handleClickCompetitions,
    handleClickRules,
    handleClickSettingsglobal,
    handleClickLogout,
    handleConfirmLogout,
    handleCancelLogout,
  } = useHomeAdmin();

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.cardHome}>
        <h2 className={styles.h2}>Início</h2>
        <div className={styles.containerOptions}>
          <button
            type="button"
            className={styles.buttonOption}
            onClick={handleClickUsers}
          >
            <UserIcon
              size={30}
              color="var(--color-blue-1)"
              colorHover="var(--color-blue-1)"
              colorDisabled="var(--color-blue-1)"
            />
            Usuários
          </button>
          <button
            type="button"
            className={styles.buttonOption}
            onClick={handleClickPlayerglobals}
          >
            <PlayerIcon
              size={30}
              color="var(--color-blue-1)"
              colorHover="var(--color-blue-1)"
              colorDisabled="var(--color-blue-1)"
            />
            Jogadores
          </button>
          <button
            type="button"
            className={styles.buttonOption}
            onClick={handleClickManagerglobals}
          >
            <ManagerIcon
              size={30}
              color="var(--color-blue-1)"
              colorHover="var(--color-blue-1)"
              colorDisabled="var(--color-blue-1)"
            />
            Treinadores
          </button>
          <button
            type="button"
            className={styles.buttonOption}
            onClick={handleClickTeamglobals}
          >
            <TeamIcon
              size={30}
              color="var(--color-blue-1)"
              colorHover="var(--color-blue-1)"
              colorDisabled="var(--color-blue-1)"
            />
            Times
          </button>
          <button
            type="button"
            className={styles.buttonOption}
            onClick={handleClickCompetitions}
          >
            <CompetitionIcon
              size={30}
              color="var(--color-blue-1)"
              colorHover="var(--color-blue-1)"
              colorDisabled="var(--color-blue-1)"
            />
            Competições
          </button>
          <button
            type="button"
            className={styles.buttonOption}
            onClick={handleClickRules}
          >
            <ToDoListIcon
              size={30}
              color="var(--color-blue-1)"
              colorHover="var(--color-blue-1)"
              colorDisabled="var(--color-blue-1)"
            />
            Regras
          </button>
          <button
            type="button"
            className={styles.buttonOption}
            onClick={handleClickSettingsglobal}
          >
            <SettingsIcon
              size={30}
              color="var(--color-blue-1)"
              colorHover="var(--color-blue-1)"
              colorDisabled="var(--color-blue-1)"
            />
            Configurações
          </button>
          <button
            type="button"
            className={styles.buttonOption}
            onClick={handleClickLogout}
          >
            <ExitIcon
              size={30}
              color="var(--color-blue-1)"
              colorHover="var(--color-blue-1)"
              colorDisabled="var(--color-blue-1)"
            />
            Sair
          </button>
        </div>
      </div>

      <Modal
        title="Sair"
        children={
          <div>Deseja realmente sair? Todas as alterações serão mantidas.</div>
        }
        isOpen={isOpenLogoutModal}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
        danger={true}
      />
    </div>
  );
};

export default HomeAdminScreen;
