export const USER_MESSAGES = {
  ERROR: {
    CREATE_USER_ERROR: "Erro ao criar usuário",
    UPDATE_USER_ERROR: "Erro ao atualizar usuário",
    SELECT_USER_ERROR: "Erro ao buscar usuários",
    SELECT_USER_INFO_ERROR: "Erro ao buscar informações do usuário",
    DELETE_MY_USER_ERROR: "Erro ao deletar seu usuário",
    DELETE_USER_ERROR: "Erro ao deletar usuário",
    DELETE_ADMIN_ERROR: "Erro ao deletar administrador",
    USER_ROOT_ID_NOT_FOUND: (userId: string) =>
      `O usuário root com identificador ${userId} não foi encontrado`,
    USER_ADMIN_ID_NOT_FOUND: (userId: string) =>
      `O usuário admin com identificador ${userId} não foi encontrado`,
    USER_ID_NOT_FOUND: (userId: string) =>
      `O usuário com identificador ${userId} não foi encontrado`,
    USER_EMAIL_NOT_FOUND: (userEmail: string) =>
      `O usuário com e-mail ${userEmail} não foi encontrado`,
    USER_ID_IS_REQUIRED: "O identificador do usuário é obrigatório",
    USER_TYPE_IS_REQUIRED: "O tipo do usuário é obrigatório",
    USER_DELETE_ID_IS_INVALID:
      "O identificador do usuário a ser deletado é obrigatório e precisa ser um UUID",
    ADMIN_DELETE_ID_IS_INVALID:
      "O identificador do administrador a ser deletado é obrigatório e precisa ser um UUID",
    PASSWORDS_DO_NOT_MATCH: "As senhas não coincidem",
    EMAIL_ALREADY_EXISTS: "E-mail já cadastrado",
    INVALID_USER_PASSWORD: "Senha atual incorreta",
  },
  SUCCESS: {
    USER_DELETED_SUCCESSFULLY: "Usuário deletado",
    ADMIN_DELETED_SUCCESSFULLY: "Administrador deletado",
    MY_USER_DELETED_SUCCESSFULLY:
      "Usuário deletado. Volte sempre que quiser 🥹",
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
      `O país com identificador ${countryId} não foi encontrado`,
  },
};

export const POSITION_MESSAGES = {
  ERROR: {
    SELECT_POSITION_ERROR: "Erro ao buscar posições",
    POSITION_ID_NOT_FOUND: (positionId: string) =>
      `A posição com identificador ${positionId} não foi encontrada`,
  },
};

export const RULE_MESSAGES = {
  ERROR: {
    SELECT_RULE_ERROR: "Erro ao buscar regras",
    RULE_ID_NOT_FOUND: (ruleId: string) =>
      `A regra com identificador ${ruleId} não foi encontrada`,
    RULE_CODE_NOT_FOUND: (ruleCode: number) =>
      `A regra com código ${ruleCode} não foi encontrada`,
    RULE_WITH_COMPETITIONGLOBAL: (ruleId: string) =>
      `A regra com identificador ${ruleId} possui uma competitição associada`,
  },
};

export const MANAGERGLOBAL_MESSAGES = {
  ERROR: {
    CREATE_MANAGERGLOBAL_ERROR: "Erro ao criar treinador",
    UPDATE_MANAGERGLOBAL_ERROR: "Erro ao atualizar treinador",
    SELECT_MANAGERGLOBAL_ERROR: "Erro ao buscar treinadores",
    SELECT_MANAGERGLOBAL_BY_ID_ERROR: "Erro ao buscar treinador",
    DELETE_MANAGERGLOBAL_ERROR: "Erro ao deletar treinador",
    MANAGERGLOBAL_ID_NOT_FOUND: (managerglobalId: string) =>
      `O treinador com identificador ${managerglobalId} não foi encontrado`,
    MANAGERGLOBAL_ID_IS_INVALID:
      "O identificador do treinador é obrigatório e precisa ser um UUID",
    MANAGERGLOBAL_WITH_TEAMGLOBAL: (managerglobalId: string) =>
      `O treinador com identificador ${managerglobalId} possui um time associado`,
  },
  SUCCESS: {
    MANAGERGLOBAL_DELETED_SUCCESSFULLY: "Treinador deletado",
  },
};

export const COMPETITIONGLOBAL_MESSAGES = {
  ERROR: {
    CREATE_COMPETITIONGLOBAL_ERROR: "Erro ao criar competição",
    UPDATE_COMPETITIONGLOBAL_ERROR: "Erro ao atualizar competição",
    SELECT_COMPETITIONGLOBAL_ERROR: "Erro ao buscar competições",
    SELECT_COMPETITIONGLOBAL_BY_ID_ERROR: "Erro ao buscar competição",
    DELETE_COMPETITIONGLOBAL_ERROR: "Erro ao deletar competição",
    COMPETITIONGLOBAL_ID_IS_INVALID:
      "O identificador da competição é obrigatório e precisa ser um UUID",
    COMPETITIONGLOBAL_ID_NOT_FOUND: (competitionglobalId: string) =>
      `A competição com identificador ${competitionglobalId} não foi encontrada`,
    TEAMGLOBALS_COUNT_INVALID: (
      teamglobalsCount: number,
      expectedCount: number,
    ) =>
      `Foram passados ${teamglobalsCount} times, mas esperava-se ${expectedCount}`,
    COMPETITION_RULE_CONFLICT_MESSAGE: (teamglobalId: string) =>
      `O time com identificador ${teamglobalId} pertence a outra competição que conflita com as regras da competição em criação`,
    COMPETITION_RULE_REQUIREMENTS_MESSAGE: (ruleId: string) =>
      `As competições com as regras necessárias para a existência da competição com a regra com identificador ${ruleId} não existem`,
    COMPETITION_RULE_DEPENDENTS_MESSAGE: (ruleId: string) =>
      `A competição com a regra com identificador ${ruleId} é necessária para a existência de competições com regras dependentes`,
    COMPETITION_RULE_DELETE_RESTRICTION_MESSAGE: (ruleId: string) =>
      `A competição com a regra com identificador ${ruleId} não pode ser excluída`,
  },
  SUCCESS: {
    COMPETITIONGLOBAL_DELETED_SUCCESSFULLY: "Competição deletada",
  },
};

export const TEAMGLOBAL_MESSAGES = {
  ERROR: {
    CREATE_TEAMGLOBAL_ERROR: "Erro ao criar time",
    UPDATE_TEAMGLOBAL_ERROR: "Erro ao atualizar time",
    SELECT_TEAMGLOBAL_ERROR: "Erro ao buscar times",
    SELECT_TEAMGLOBAL_BY_ID_ERROR: "Erro ao buscar time",
    DELETE_TEAMGLOBAL_ERROR: "Erro ao deletar time",
    TEAMGLOBAL_ID_IS_INVALID:
      "O identificador do time é obrigatório e precisa ser um UUID",
    TEAMGLOBAL_ID_NOT_FOUND: (teamglobalId: string) =>
      `O time com identificador ${teamglobalId} não foi encontrado`,
    TEAMGLOBAL_WITH_COMPETITIONGLOBAL: (teamglobalId: string) =>
      `O time com identificador ${teamglobalId} possui uma competição associada`,
  },
  SUCCESS: {
    TEAMGLOBAL_DELETED_SUCCESSFULLY: "Time deletado",
  },
};

export const PLAYERGLOBAL_MESSAGES = {
  ERROR: {
    CREATE_PLAYERGLOBAL_ERROR: "Erro ao criar jogador",
    UPDATE_PLAYERGLOBAL_ERROR: "Erro ao atualizar jogador",
    SELECT_PLAYERGLOBAL_ERROR: "Erro ao buscar jogadores",
    SELECT_PLAYERGLOBAL_BY_ID_ERROR: "Erro ao buscar jogador",
    DELETE_PLAYERGLOBAL_ERROR: "Erro ao deletar jogador",
    PLAYERGLOBAL_ID_NOT_FOUND: (playerglobalId: string) =>
      `O jogador com identificador ${playerglobalId} não foi encontrado`,
    PLAYERGLOBAL_ID_IS_INVALID:
      "O identificador do jogador é obrigatório e precisa ser um UUID",
    PLAYERGLOBAL_WITH_TEAMGLOBAL: (playerglobalId: string) =>
      `O jogador com identificador ${playerglobalId} possui um time associado`,
    COMMON_POSITION_IDS: (commonPositionIds: string[]) =>
      `Os seguintes identificadores são comuns entre as posições primárias e secundárias: ${commonPositionIds.join(
        ", ",
      )}`,
  },
  SUCCESS: {
    PLAYERGLOBAL_DELETED_SUCCESSFULLY: "Jogador deletado",
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
