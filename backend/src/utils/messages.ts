export const ERROR_MESSAGES = {
  USER: {
    EMAIL_ALREADY_EXISTS: "E-mail já cadastrado",
    CREATE_USER_ERROR: "Erro ao criar usuário",
    UPDATE_USER_ERROR: "Erro ao editar usuário",
    SELECT_USER_ERROR: "Erro ao buscar usuários",
    SELECT_USER_INFO_ERROR: "Erro ao buscar informações do usuário",
    PASSWORDS_DO_NOT_MATCH: "As senhas não coincidem",
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
    INVALID_USER_PASSWORD: "Senha atual incorreta",
    DELETE_MY_USER_ERROR: "Erro ao deletar seu usuário",
    DELETE_USER_ERROR: "Erro ao deletar usuário",
    DELETE_ADMIN_ERROR: "Erro ao deletar administrador",
    USER_DELETE_ID_IS_REQUIRED: "O userDeleteId é obrigatório",
    ADMIN_DELETE_ID_IS_REQUIRED: "O adminDeleteId é obrigatório",
  },
  AUTH: {
    INVALID_CREDENTIALS: "E-mail ou senha inválidos",
    ACCESS_DENIED: "Acesso negado",
  },
  COUNTRY: {
    SELECT_COUNTRY_ERROR: "Erro ao buscar países",
    COUNTRY_ID_NOT_FOUND: (countryId: string) =>
      `O país com id ${countryId} não foi encontrado`,
  },
  ENV: {
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
  DTO: {
    INVALID_DATA:
      "Os dados fornecidos são inválidos. Verifique e tente novamente",
  },
};

export const SUCCESS_MESSAGES = {
  USER: {
    USER_DELETED_SUCCESSFULLY: "Usuário deletado",
    ADMIN_DELETED_SUCCESSFULLY: "Administrador deletado",
    MY_USER_DELETED_SUCCESSFULLY: "Usuário deletado. Volte sempre que quiser 🥹",
  },
};

export const LOG_MESSAGES = {
  DATABASE_CONNECTED: "Database connected",
  MIGRATIONS_EXECUTED: "Migrations executed",
  SERVER_RUNNING: (port: number) => `Server is running on port ${port}`,
  DATABASE_INITIALIZATION_ERROR: "Error during Data Source initialization:",
};
