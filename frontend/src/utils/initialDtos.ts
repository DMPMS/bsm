import type { SignInDto } from "../dtos/signIn.dto";
import type { SignUpDto } from "../dtos/signUp.dto";
import type { UpdateSettingsglobalDto } from "../dtos/updateSettingsglobal.dto";
import type { UpsertCompetitionglobalDto } from "../dtos/upsertCompetitionglobal.dto";
import type { UpsertManagerglobalDto } from "../dtos/upsertManagerglobal.dto";
import type { UpsertPlayerglobalDto } from "../dtos/upsertPlayerglobal.dto";
import type { UpsertTeamglobalDto } from "../dtos/upsertTeamglobal.dto";

export const INITIAL_SIGN_IN_DTO: SignInDto = {
  email: "",
  password: "",
};

export const INITIAL_SIGN_UP_DTO: SignUpDto = {
  name: "",
  imageUrl: "",
  email: "",
  birthdate: "",
  password: "",
  confirmPassword: "",

  countryId: undefined,
};

export const INITIAL_UPSERT_MANAGERGLOBAL_DTO: UpsertManagerglobalDto = {
  name: "",
  imageUrl: "",
  birthdate: "",

  countryId: undefined,
};

export const INITIAL_UPSERT_PLAYERGLOBAL_DTO: UpsertPlayerglobalDto = {
  name: "",
  imageUrl: "",
  birthdate: "",
  overall: 60,

  countryId: undefined,
  primaryPositionIds: [],
  secondaryPositionIds: [],
};

export const INITIAL_UPSERT_TEAMGLOBAL_DTO: UpsertTeamglobalDto = {
  name: "",
  abbreviation: "",
  imageUrl: "",

  countryId: undefined,
  managerglobalId: undefined,
  playerglobalIds: [],
};

export const INITIAL_UPSERT_COMPETITIONGLOBAL_DTO: UpsertCompetitionglobalDto =
  {
    name: "",
    imageUrl: "",

    ruleId: undefined,
    teamglobalIds: [],
  };

export const INITIAL_UPDATE_SETTINGSGLOBAL_DTO: UpdateSettingsglobalDto = {
  seasonOffset: 0,
};
