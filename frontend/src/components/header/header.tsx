import { useEffect, useState } from "react";
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
import { CompetitionglobalRoutesEnum } from "../../routes/competitionglobal.routes";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

const Header = ({ ...props }: HeaderProps) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  useEffect(() => {
    checkMenuVisibility();

    window.addEventListener("resize", checkMenuVisibility);

    return () => {
      window.removeEventListener("resize", checkMenuVisibility);
    };
  }, []);

  const checkMenuVisibility = () => {
    const menuHideAtWith = 700;
    const currentWidth = window.innerWidth;

    setIsMenuVisible(currentWidth <= menuHideAtWith);
  };

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
    navigate(CompetitionglobalRoutesEnum.Competitionglobals);
  };

  return (
    <header className={styles.header} {...props}>
      <button type="button" className={styles.menu} onClick={handleClickMenu}>
        <MenuIcon
          size={20}
          color="var(--color-blue-3)"
          colorHover="var(--color-blue-3)"
          colorDisabled="var(--color-blue-3)"
        />
      </button>
      <nav className={`${styles.nav} ${isOpen ? styles.navVisible : ""}`}>
        <button
          tabIndex={!isMenuVisible ? 0 : isOpen ? 0 : -1}
          type="button"
          className={styles.navItem}
          onClick={handleClickUsers}
        >
          <UserIcon
            size={20}
            color="var(--color-blue-3)"
            colorHover="var(--color-blue-3)"
            colorDisabled="var(--color-blue-3)"
          />
          Usuários
        </button>
        <button
          tabIndex={!isMenuVisible ? 0 : isOpen ? 0 : -1}
          type="button"
          className={styles.navItem}
          onClick={handleClickPlayerglobals}
        >
          <PlayerIcon
            size={20}
            color="var(--color-blue-3)"
            colorHover="var(--color-blue-3)"
            colorDisabled="var(--color-blue-3)"
          />
          Jogadores
        </button>
        <button
          tabIndex={!isMenuVisible ? 0 : isOpen ? 0 : -1}
          type="button"
          className={styles.navItem}
          onClick={handleClickManagerglobals}
        >
          <ManagerIcon
            size={20}
            color="var(--color-blue-3)"
            colorHover="var(--color-blue-3)"
            colorDisabled="var(--color-blue-3)"
          />
          Treinadores
        </button>
        <button
          tabIndex={!isMenuVisible ? 0 : isOpen ? 0 : -1}
          type="button"
          className={styles.navItem}
          onClick={handleClickTeamglobals}
        >
          <TeamIcon
            size={20}
            color="var(--color-blue-3)"
            colorHover="var(--color-blue-3)"
            colorDisabled="var(--color-blue-3)"
          />
          Times
        </button>
        <button
          tabIndex={!isMenuVisible ? 0 : isOpen ? 0 : -1}
          type="button"
          className={styles.navItem}
          onClick={handleClickCompetitions}
        >
          <CompetitionIcon
            size={20}
            color="var(--color-blue-3)"
            colorHover="var(--color-blue-3)"
            colorDisabled="var(--color-blue-3)"
          />
          Competições
        </button>
      </nav>
    </header>
  );
};

export default Header;
