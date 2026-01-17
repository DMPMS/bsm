import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./reducers/globalReducer";
import userReducer from "./reducers/userReducer";
import countryReducer from "./reducers/countryReducer";
import teamglobalReducer from "./reducers/teamglobalReducer";
import positionReducer from "./reducers/positionReducer";
import playerglobalReducer from "./reducers/playerglobalReducer";
import managerglobalReducer from "./reducers/managerglobalReducer";
import ruleReducer from "./reducers/ruleReducer";
import competitionglobalReducer from "./reducers/competitionglobalReducer";

export const store = configureStore({
  reducer: {
    globalReducer,
    userReducer,
    countryReducer,
    teamglobalReducer,
    positionReducer,
    playerglobalReducer,
    managerglobalReducer,
    ruleReducer,
    competitionglobalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
