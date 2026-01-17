import { ENV_MESSAGES } from "../utils/messages";

const BACKEND_API_PORT = import.meta.env.VITE_BACKEND_API_PORT;

if (!BACKEND_API_PORT) {
  throw new Error(ENV_MESSAGES.ERROR.MISSING_BACKEND_API_PORT);
}

export const URL_AUTH = `http://localhost:${BACKEND_API_PORT}/api/auth`;

export const URL_USER = `http://localhost:${BACKEND_API_PORT}/api/user`;
export const URL_USER_ID = `http://localhost:${BACKEND_API_PORT}/api/user/:userId`;

export const URL_COUNTRY = `http://localhost:${BACKEND_API_PORT}/api/country`;

export const URL_POSITION = `http://localhost:${BACKEND_API_PORT}/api/position`;

export const URL_RULE = `http://localhost:${BACKEND_API_PORT}/api/rule`;

export const URL_TEAMGLOBAL = `http://localhost:${BACKEND_API_PORT}/api/teamglobal`;
export const URL_TEAMGLOBAL_ID = `http://localhost:${BACKEND_API_PORT}/api/teamglobal/:teamglobalId`;

export const URL_PLAYERGLOBAL = `http://localhost:${BACKEND_API_PORT}/api/playerglobal`;
export const URL_PLAYERGLOBAL_ID = `http://localhost:${BACKEND_API_PORT}/api/playerglobal/:playerglobalId`;

export const URL_MANAGERGLOBAL = `http://localhost:${BACKEND_API_PORT}/api/managerglobal`;
export const URL_MANAGERGLOBAL_ID = `http://localhost:${BACKEND_API_PORT}/api/managerglobal/:managerglobalId`;

export const URL_COMPETITIONGLOBAL = `http://localhost:${BACKEND_API_PORT}/api/competitionglobal`;
export const URL_COMPETITIONGLOBAL_ID = `http://localhost:${BACKEND_API_PORT}/api/competitionglobal/:competitionglobalId`;
