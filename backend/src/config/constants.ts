export const PAGINATION = {
  INITIAL_PAGE: 1,
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 5,
};

export const CURRENT_DATE = new Date();

export const UUID_VERSION = "4";

export const USER = {
  NAME: {
    MIN: 4,
    MAX: 30,
  },
  AGE: {
    MIN: 18,
    MAX: 90,
  },
  EMAIL: {
    MIN: 8,
    MAX: 100,
  },
  HASHED_PASSWORD: {
    MIN: 60,
    MAX: 60,
  },
  PASSWORD: {
    MIN: 8,
    MAX: 100,
  },
  CONFIRM_PASSWORD: {
    MIN: 1,
    MAX: 100,
  },
};

export const COUNTRY = {
  NAME: {
    MIN: 1,
    MAX: 30,
  },
};

export const RULE = {
  NAME: {
    MIN: 1,
    MAX: 30,
  },
  DEFAULT_COMPETITION_NAME: {
    MIN: 4,
    MAX: 30,
  },
};

export const MANAGERGLOBAL = {
  NAME: {
    MIN: 4,
    MAX: 30,
  },
  AGE: {
    MIN: 18,
    MAX: 90,
  },
};

export const PLAYERGLOBAL = {
  NAME: {
    MIN: 4,
    MAX: 30,
  },
  AGE: {
    MIN: 16,
    MAX: 50,
  },
  OVERALL: {
    MIN: 1,
    MAX: 100,
  },
  PRIMARY_POSITIONS: {
    MIN: 1,
    MAX: 3,
  },
  SECONDARY_POSITIONS: {
    MIN: 0,
    MAX: 5,
  },
};

export const POSITION = {
  NAME: {
    MIN: 1,
    MAX: 30,
  },
  ABBREVIATION: {
    MIN: 1,
    MAX: 3,
  },
};

export const TEAMGLOBAL = {
  NAME: {
    MIN: 4,
    MAX: 30,
  },
  ABBREVIATION: {
    MIN: 1,
    MAX: 3,
  },
  PLAYERGLOBALS: {
    MIN: 16,
    MAX: 33,
  },
};

export const COMPETITIONGLOBAL = {
  NAME: {
    MIN: 4,
    MAX: 30,
  },
};

export const SETTINGSGLOBAL = {
  SEASON_OFFSET: {
    MIN: -1,
    MAX: 1,
  },
};
