import { configureStore } from "@reduxjs/toolkit";

import globalReducer from "./reducers/globalReducer";
import userReducer from "./reducers/userReducer";
import countryReducer from "./reducers/countryReducer";
import teamglobalReducer from "./reducers/teamglobalReducer";

export const store = configureStore({
  reducer: {
    globalReducer,
    userReducer,
    countryReducer,
    teamglobalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
