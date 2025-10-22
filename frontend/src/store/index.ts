import { configureStore } from "@reduxjs/toolkit";

import globalReducer from "./reducers/globalReducer";
import userReducer from "./reducers/userReducer";
import countryReducer from "./reducers/countryReducer";
import teamglobalReducer from "./reducers/teamglobalReducer";
import positionReducer from "./reducers/positionReducer";
import playerglobalReducer from "./reducers/playerglobalReducer";
import managerglobalReducer from "./reducers/managerglobalReducer";

export const store = configureStore({
  reducer: {
    globalReducer,
    userReducer,
    countryReducer,
    teamglobalReducer,
    positionReducer,
    playerglobalReducer,
    managerglobalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
