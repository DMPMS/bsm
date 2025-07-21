import { configureStore } from "@reduxjs/toolkit";

import globalReducer from "./reducers/globalReducer";
import userReducer from "./reducers/userReducer";
import countryReducer from "./reducers/countryReducer";

export const store = configureStore({
  reducer: {
    globalReducer,
    userReducer,
    countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
