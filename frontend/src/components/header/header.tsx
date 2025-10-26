import { useState } from "react";
import styles from "./header.module.css";
import UserIcon from "../icons/user.icon";
import PlayerIcon from "../icons/player.icon";
import TeamIcon from "../icons/team.icon";
import ManagerIcon from "../icons/manager.icon";
import CompetitionIcon from "../icons/competition.icon";
import MenuIcon from "../icons/menu.icon";
import { useNavigate } from "react-router-dom";
import { UserRoutesEnum } from "../../routes/user.routes";
import { PlayerglobalRoutesEnum } from "../../routes/playerglobal.routes";
import { TeamglobalRoutesEnum } from "../../routes/teamglobal.routes";
import { ManagerglobalRoutesEnum } from "../../routes/managerglobal.routes";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

const Header = ({ ...props }: HeaderProps) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handleClickMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickUsers = () => {
    navigate(UserRoutesEnum.Users);
  };

  const handleClickPlayerglobals = () => {
    navigate(PlayerglobalRoutesEnum.Playerglobals);
  };

  const handleClickManagerglobals = () => {
    navigate(ManagerglobalRoutesEnum.Managerglobals);
  };

  const handleClickTeamglobals = () => {
    navigate(TeamglobalRoutesEnum.Teamglobals);
  };

  const handleClickCompetitions = () => {
    // navigate(CompetitionglobalRoutesEnum.Competitionglobals);
  };

  return (
    <header className={styles.header} {...props}>
      <MenuIcon
        className={styles.menuIcon}
        size={20}
        color="var(--color-white-1)"
        colorHover="var(--color-white-2)"
        colorDisabled="var(--color-white-1)"
        onClick={handleClickMenu}
      />
      <nav className={`${styles.nav} ${isOpen ? styles.navShow : ""}`}>
        <div className={styles.navItem} onClick={handleClickUsers}>
          <UserIcon
            size={20}
            color="var(--color-blue-3)"
            colorHover="var(--color-blue-3)"
            colorDisabled="var(--color-blue-3)"
          />
          Usuários
        </div>
        <div className={styles.navItem} onClick={handleClickPlayerglobals}>
          <PlayerIcon
            size={20}
            color="var(--color-blue-3)"
            colorHover="var(--color-blue-3)"
            colorDisabled="var(--color-blue-3)"
          />
          Jogadores
        </div>
        <div className={styles.navItem} onClick={handleClickManagerglobals}>
          <ManagerIcon
            size={20}
            color="var(--color-blue-3)"
            colorHover="var(--color-blue-3)"
            colorDisabled="var(--color-blue-3)"
          />
          Treinadores
        </div>
        <div className={styles.navItem} onClick={handleClickTeamglobals}>
          <TeamIcon
            size={20}
            color="var(--color-blue-3)"
            colorHover="var(--color-blue-3)"
            colorDisabled="var(--color-blue-3)"
          />
          Times
        </div>
        <div className={styles.navItem} onClick={handleClickCompetitions}>
          <CompetitionIcon
            size={20}
            color="var(--color-blue-3)"
            colorHover="var(--color-blue-3)"
            colorDisabled="var(--color-blue-3)"
          />
          Competições
        </div>
      </nav>
    </header>
  );
};

export default Header;
