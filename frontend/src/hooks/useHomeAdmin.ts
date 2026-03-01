import { useNavigate } from "react-router-dom";
import { UserRoutesEnum } from "../routes/user.routes";
import { PlayerglobalRoutesEnum } from "../routes/playerglobal.routes";
import { ManagerglobalRoutesEnum } from "../routes/managerglobal.routes";
import { TeamglobalRoutesEnum } from "../routes/teamglobal.routes";
import { CompetitionglobalRoutesEnum } from "../routes/competitionglobal.routes";
import { useState } from "react";
import { logout } from "../utils/auth";
import { RulesRoutesEnum } from "../routes/rules.routes";
import { SettingsglobalRoutesEnum } from "../routes/settingsglobal.routes";

export const useHomeAdmin = () => {
  const navigate = useNavigate();

  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState<boolean>(false);

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

  const handleClickRules = () => {
    navigate(RulesRoutesEnum.Rules);
  };

  const handleClickUpdateUser = () => {};

  const handleClickSettingsglobal = () => {
    navigate(SettingsglobalRoutesEnum.Settingsglobal);
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

  return {
    isOpenLogoutModal,
    handleClickUsers,
    handleClickPlayerglobals,
    handleClickManagerglobals,
    handleClickTeamglobals,
    handleClickCompetitions,
    handleClickRules,
    handleClickUpdateUser,
    handleClickSettingsglobal,
    handleClickLogout,
    handleConfirmLogout,
    handleCancelLogout,
  };
};
