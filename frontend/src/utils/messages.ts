export const SIGN_IN_MESSAGES = {
  ERROR: {
    TOKEN_USER_TYPE_ROOT: "E-mail ou senha inválidos",
  },
  FIELD_VALIDATION: {
    EMAIL_IS_INVALID: "Insira um e-mail válido.",
  },
  SUCCESS: {
    WELCOME: (name: string) => `Bem-vindo(a) de volta, ${name}`,
  },
};

export const SIGN_UP_MESSAGES = {
  SUCCESS: {
    WELCOME: (name: string) => `Bem-vindo(a), ${name}`,
  },
};

export const TEAMGLOBAL_MESSAGES = {
  FIELD_VALIDATION: {
    PLAYERGLOBALS: (min: number, max: number) =>
      `Selecione de ${min} a ${max} jogadores.`,
  },
  SUCCESS: {
    CREATE: "Time criado",
    UPDATE: "Time atualizado",
    DELETE: "Time deletado",
  },
};

export const PLAYERGLOBAL_MESSAGES = {
  FIELD_VALIDATION: {
    PRIMARY_POSITIONS: (min: number, max: number) =>
      max === 1
        ? "Selecione 1 posição primária."
        : `Selecione de ${min} a ${max} posições primárias.`,
    SECONDARY_POSITIONS: (min: number, max: number) =>
      min === 0
        ? `Selecione até ${max} posição(ões) secundária(s).`
        : `Selecione de ${min} a ${max} posição(ões) secundária(s).`,
  },
  SUCCESS: {
    CREATE: "Jogador criado",
    UPDATE: "Jogador atualizado",
    DELETE: "Jogador deletado",
  },
};

export const MANAGERGLOBAL_MESSAGES = {
  SUCCESS: {
    CREATE: "Treinador criado",
    UPDATE: "Treinador atualizado",
    DELETE: "Treinador deletado",
  },
};

export const COMPETITIONGLOBAL_MESSAGES = {
  FIELD_VALIDATION: {
    TEAMGLOBALS: (numberOfTeams: number) => `Selecione ${numberOfTeams} times.`,
  },
  SUCCESS: {
    CREATE: "Competição criada",
    UPDATE: "Competição atualizada",
    DELETE: "Competição deletada",
  },
};

export const USER_MESSAGES = {
  FIELD_VALIDATION: {
    EMAIL: {
      EMAIL_IS_INVALID: "Insira um e-mail válido.",
    },
    CONFIRM_PASSWORD: {
      PASSWORDS_DO_NOT_MATCH: "As senhas não coincidem.",
    },
  },
  SUCCESS: {
    DELETE: "Usuário deletado",
  },
};

export const ENV_MESSAGES = {
  ERROR: {
    MISSING_BACKEND_API_PORT: "BACKEND_API_PORT não definido no arquivo .env",
  },
};

export const GENERAL_FIELD_VALIDATION_MESSAGES = {
  REQUIRED: "Preencha este campo.",
  REQUIRED_CHECKBOX: "Selecione as opções.",
  MIN_CHARACTER: (min: number) => `Insira pelo menos ${min} caractere(s).`,
  MAX_CHARACTER: (max: number) => `Insira até ${max} caractere(s).`,
  MIN: (min: number) => `Insira um valor maior ou igual a ${min}.`,
  MAX: (max: number) => `Insira um valor menor ou igual a ${max}.`,
  BIRTHDATE: (minAge: number, maxAge: number) =>
    `A idade deve estar entre ${minAge} e ${maxAge} anos.`,
  IMAGE_URL_IS_INVALID: "Insira uma URL de imagem válida.",
};

export const OTHER_MESSAGES = {
  DEFAULT_ERROR: "Erro",
};
