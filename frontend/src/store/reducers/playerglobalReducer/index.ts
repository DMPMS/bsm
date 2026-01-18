import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PlayerglobalType } from "../../../types/Playerglobal.type";

interface PlayerglobalState {
  playerglobal?: PlayerglobalType;
  playerglobals: PlayerglobalType[];
}

const initialState: PlayerglobalState = {
  playerglobal: undefined,
  playerglobals: [],
};

export const counterSlice = createSlice({
  name: "playerglobalReducer",
  initialState,
  reducers: {
    setPlayerglobalAction: (
      state,
      action: PayloadAction<PlayerglobalType | undefined>,
    ) => {
      state.playerglobal = action.payload;
    },
    setPlayerglobalsAction: (
      state,
      action: PayloadAction<PlayerglobalType[]>,
    ) => {
      state.playerglobals = action.payload;
    },
  },
});

export const { setPlayerglobalAction, setPlayerglobalsAction } =
  counterSlice.actions;

export default counterSlice.reducer;
