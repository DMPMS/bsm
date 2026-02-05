import { useEffect, useRef, useState } from "react";
import styles from "./header.module.css";
import PlayerIcon from "../icons/player.icon";
import TeamIcon from "../icons/team.icon";
import ManagerIcon from "../icons/manager.icon";
import CompetitionIcon from "../icons/competition.icon";
import MenuIcon from "../icons/menu.icon";
import { useNavigate } from "react-router-dom";
import { PlayerglobalRoutesEnum } from "../../routes/playerglobal.routes";
import { TeamglobalRoutesEnum } from "../../routes/teamglobal.routes";
import { ManagerglobalRoutesEnum } from "../../routes/managerglobal.routes";
import { CompetitionglobalRoutesEnum } from "../../routes/competitionglobal.routes";
import ExitIcon from "../icons/exit.icon";
import HomeIcon from "../icons/home.icon";
import { OtherRoutesEnum } from "../../routes/other.routes";
import Modal from "../modal/modal";
import { logout } from "../../utils/auth";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

const Header = ({ ...props }: HeaderProps) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  const [penultimateClicked, setPenultimateClicked] = useState<Element | null>(
    null,
  );
  const [lastClicked, setLastClicked] = useState<Element | null>(null);

  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState<boolean>(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    checkMenuVisibility();

    window.addEventListener("resize", checkMenuVisibility);

    return () => {
      window.removeEventListener("resize", checkMenuVisibility);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const menuButtonClicked =
        menuButtonRef.current &&
        menuButtonRef.current.contains(e.target as Node);

      const navClicked =
        navRef.current && navRef.current.contains(e.target as Node);

      if (!menuButtonClicked && !navClicked) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const updateHistory = (el: Element | null) => {
      setPenultimateClicked(lastClicked);
      setLastClicked(el);
    };

    const handleDocumentClick = (e: MouseEvent) => {
      updateHistory(e.target as Element);
    };
    const handleDocumentFocus = (e: KeyboardEvent) => {
      updateHistory(e.target as Element);
    };

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleDocumentFocus);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleDocumentFocus);
    };
  }, [lastClicked]);

  const checkMenuVisibility = () => {
    const menuHideAtWith = 700;
    const currentWidth = window.innerWidth;

    setIsMenuVisible(currentWidth <= menuHideAtWith);
  };

  const handleNavBlur = (e: React.FocusEvent<HTMLElement>) => {
    const nav = e.currentTarget;
    if (!nav.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  const handleClickMenu = () => {
    if (penultimateClicked !== navRef.current) {
      setIsOpen(!isOpen);
    }
  };

  const handleClickHome = () => {
    navigate(OtherRoutesEnum.HomeAdmin);
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

  const handleClickLogout = () => {
    setIsOpenLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    logout(navigate);
  };

  const handleCancelLogout = () => {
    setIsOpenLogoutModal(false);
  };

  return (
    <header className={styles.header} {...props}>
      <button
        ref={menuButtonRef}
        type="button"
        className={styles.menu}
        onClick={handleClickMenu}
      >
        <MenuIcon
          size={20}
          color="var(--color-blue-3)"
          colorHover="var(--color-blue-3)"
          colorDisabled="var(--color-blue-3)"
        />
      </button>
      <nav
        ref={navRef}
        className={`${styles.nav} ${isOpen ? styles.navVisible : ""}`}
        tabIndex={-1}
        onBlur={isMenuVisible && isOpen ? handleNavBlur : undefined}
      >
        <button
          tabIndex={!isMenuVisible ? 0 : isOpen ? 0 : -1}
          type="button"
          className={styles.navItem}
          onClick={handleClickHome}
        >
          <HomeIcon
            size={20}
            color="var(--color-blue-3)"
            colorHover="var(--color-blue-3)"
            colorDisabled="var(--color-blue-3)"
          />
          Início
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
        <button
          tabIndex={!isMenuVisible ? 0 : isOpen ? 0 : -1}
          type="button"
          className={styles.navItem}
          onClick={handleClickLogout}
        >
          <ExitIcon
            size={20}
            color="var(--color-blue-3)"
            colorHover="var(--color-blue-3)"
            colorDisabled="var(--color-blue-3)"
          />
          Sair
        </button>
      </nav>

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
    </header>
  );
};

export default Header;
