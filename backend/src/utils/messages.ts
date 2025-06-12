export const USER_MESSAGES = {
  ERROR: {
    CREATE_USER_ERROR: "Erro ao criar usuário",
    UPDATE_USER_ERROR: "Erro ao editar usuário",
    SELECT_USER_ERROR: "Erro ao buscar usuários",
    SELECT_USER_INFO_ERROR: "Erro ao buscar informações do usuário",
    DELETE_MY_USER_ERROR: "Erro ao deletar seu usuário",
    DELETE_USER_ERROR: "Erro ao deletar usuário",
    DELETE_ADMIN_ERROR: "Erro ao deletar administrador",
    USER_ROOT_ID_NOT_FOUND: (userId: string) =>
      `O usuário root com id ${userId} não foi encontrado`,
    USER_ADMIN_ID_NOT_FOUND: (userId: string) =>
      `O usuário admin com id ${userId} não foi encontrado`,
    USER_ID_NOT_FOUND: (userId: string) =>
      `O usuário com id ${userId} não foi encontrado`,
    USER_EMAIL_NOT_FOUND: (userEmail: string) =>
      `O usuário com e-mail ${userEmail} não foi encontrado`,
    USER_ID_IS_REQUIRED: "O userId é obrigatório",
    USER_TYPE_IS_REQUIRED: "O userType é obrigatório",
    USER_DELETE_ID_IS_INVALID:
      "O userDeleteId é obrigatório e precisa ser um UUID",
    ADMIN_DELETE_ID_IS_INVALID:
      "O adminDeleteId é obrigatório e precisa ser um UUID",
    PASSWORDS_DO_NOT_MATCH: "As senhas não coincidem",
    EMAIL_ALREADY_EXISTS: "E-mail já cadastrado",
    INVALID_USER_PASSWORD: "Senha atual incorreta",
  },
  SUCCESS: {
    USER_DELETED_SUCCESSFULLY: "Usuário deletado",
    ADMIN_DELETED_SUCCESSFULLY: "Administrador deletado",
    MY_USER_DELETED_SUCCESSFULLY: "Usuário deletado. Volte sempre que quiser 🥹",
  },
};

export const AUTH_MESSAGES = {
  ERROR: {
    SIGN_IN_ERROR: "Erro ao fazer login",
    INVALID_CREDENTIALS: "E-mail ou senha inválidos",
    ACCESS_DENIED: "Acesso negado",
  },
};

export const COUNTRY_MESSAGES = {
  ERROR: {
    SELECT_COUNTRY_ERROR: "Erro ao buscar países",
    COUNTRY_ID_NOT_FOUND: (countryId: string) =>
      `O país com id ${countryId} não foi encontrado`,
  },
};

export const POSITION_MESSAGES = {
  ERROR: {
    SELECT_POSITION_ERROR: "Erro ao buscar posições",
    POSITION_ID_NOT_FOUND: (positionId: string) =>
      `A posição com id ${positionId} não foi encontrada`,
  },
};
export const MANAGERGLOBAL_MESSAGES = {
  ERROR: {
    CREATE_MANAGERGLOBAL_ERROR: "Erro ao criar managerglobal",
    UPDATE_MANAGERGLOBAL_ERROR: "Erro ao editar managerglobal",
    SELECT_MANAGERGLOBAL_ERROR: "Erro ao buscar managerglobals",
    SELECT_MANAGERGLOBAL_BY_ID_ERROR: "Erro ao buscar managerglobal",
    DELETE_MANAGERGLOBAL_ERROR: "Erro ao deletar managerglobal",
    MANAGERGLOBAL_ID_NOT_FOUND: (managerglobalId: string) =>
      `O managerglobal com id ${managerglobalId} não foi encontrado`,
    MANAGERGLOBAL_ID_IS_INVALID:
      "O managerglobalId é obrigatório e precisa ser um UUID",
    MANAGERGLOBAL_WITH_TEAMGLOBAL: (managerglobalId: string) =>
      `O managerglobal com id ${managerglobalId} possui um teamglobal`,
  },
  SUCCESS: {
    MANAGERGLOBAL_DELETED_SUCCESSFULLY: "Managerglobal deletado",
  },
};
export const TEAMGLOBAL_MESSAGES = {
  ERROR: {
    CREATE_TEAMGLOBAL_ERROR: "Erro ao criar teamglobal",
    UPDATE_TEAMGLOBAL_ERROR: "Erro ao editar teamglobal",
    SELECT_TEAMGLOBAL_ERROR: "Erro ao buscar teamglobals",
    SELECT_TEAMGLOBAL_BY_ID_ERROR: "Erro ao buscar teamglobal",
    DELETE_TEAMGLOBAL_ERROR: "Erro ao deletar teamglobal",
    TEAMGLOBAL_ID_IS_INVALID:
      "O teamglobalId é obrigatório e precisa ser um UUID",
    TEAMGLOBAL_ID_NOT_FOUND: (teamglobalId: string) =>
      `O teamglobal com id ${teamglobalId} não foi encontrado`,
  },
  SUCCESS: {
    TEAMGLOBAL_DELETED_SUCCESSFULLY: "Teamglobal deletado",
  },
};
export const PLAYERGLOBAL_MESSAGES = {
  ERROR: {
    CREATE_PLAYERGLOBAL_ERROR: "Erro ao criar playerglobal",
    UPDATE_PLAYERGLOBAL_ERROR: "Erro ao editar playerglobal",
    SELECT_PLAYERGLOBAL_ERROR: "Erro ao buscar playerglobals",
    SELECT_PLAYERGLOBAL_BY_ID_ERROR: "Erro ao buscar playerglobal",
    DELETE_PLAYERGLOBAL_ERROR: "Erro ao deletar playerglobal",
    PLAYERGLOBAL_ID_NOT_FOUND: (playerglobalId: string) =>
      `O playerglobal com id ${playerglobalId} não foi encontrado`,
    PLAYERGLOBAL_ID_IS_INVALID:
      "O playerglobalId é obrigatório e precisa ser um UUID",
    PLAYERGLOBAL_WITH_TEAMGLOBAL: (playerglobalId: string) =>
      `O playerglobal com id ${playerglobalId} possui um teamglobal`,
    COMMON_POSITION_IDS: (commonPositionIds: string[]) =>
      `Os seguintes positionIds são comuns entre as posições primárias e secundárias: ${commonPositionIds.join(
        ", "
      )}`,
  },
  SUCCESS: {
    PLAYERGLOBAL_DELETED_SUCCESSFULLY: "Playerglobal deletado",
  },
};
export const ENV_MESSAGES = {
  ERROR: {
    MISSING_DB_HOST: "DB_HOST não definido no arquivo .env",
    MISSING_DB_USER: "DB_USER não definido no arquivo .env",
    MISSING_DB_PORT: "DB_PORT não definido no arquivo .env",
    MISSING_DB_PASSWORD: "DB_PASSWORD não definido no arquivo .env",
    MISSING_DB_DATABASE: "DB_DATABASE não definido no arquivo .env",
    MISSING_API_PORT: "API_PORT não definido no arquivo .env",
    MISSING_JWT_SECRET: "JWT_SECRET não definido no arquivo .env",
    MISSING_JWT_EXPIRES_IN: "JWT_EXPIRES_IN não definido no arquivo .env",
    MISSING_ROOT_EMAIL_OR_PASSWORD:
      "ROOT_EMAIL ou ROOT_PASSWORD não definidos no arquivo .env",
    MISSING_ROOT_EMAIL: "ROOT_EMAIL não definido no arquivo .env",
    MISSING_ADMIN_EMAIL_OR_PASSWORD:
      "ADMIN_EMAIL ou ADMIN_PASSWORD não definidos no arquivo .env",
    MISSING_ADMIN_EMAIL: "ADMIN_EMAIL não definido no arquivo .env",
  },
};
export const DTO_MESSAGES = {
  ERROR: {
    INVALID_DATA:
      "Os dados fornecidos são inválidos. Verifique e tente novamente",
  },
};

export const LOG_MESSAGES = {
  DATABASE_CONNECTED: "Database connected",
  MIGRATIONS_EXECUTED: "Migrations executed",
  SERVER_RUNNING: (port: number) => `Server is running on port ${port}`,
  DATABASE_INITIALIZATION_ERROR: "Error during Data Source initialization:",
};
