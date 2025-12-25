export const MILLISECONDS_TO_SECONDS = 1000;

export const CURRENT_DATE = new Date();

export const PAGINATION = {
  INITIAL_PAGE: 1,
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 5,
};

export const DEFAULT_TEAMGLOBAL_IMAGE_URL =
  "https://i.ibb.co/HTJXnqSW/default-team.png";
export const DEFAULT_USER_IMAGE_URL =
  "https://i.ibb.co/Y4nfzFbB/default-user.png";
export const DEFAULT_PLAYERGLOBAL_IMAGE_URL =
  "https://i.ibb.co/RpRcyk1x/default-jogador.png";
export const DEFAULT_MANAGERGLOBAL_IMAGE_URL =
  "https://i.ibb.co/R8PnW1z/default-treinador.png";

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
  PASSWORD: {
    MIN: 8,
    MAX: 100,
  },
  CONFIRM_PASSWORD: {
    MIN: 1,
    MAX: 100,
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
