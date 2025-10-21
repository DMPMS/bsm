import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PlayerglobalType } from "../../../types/Playerglobal.type";

interface PlayerglobalState {
  playerglobals: PlayerglobalType[];
}

const initialState: PlayerglobalState = {
  playerglobals: [],
};

export const counterSlice = createSlice({
  name: "playerglobalReducer",
  initialState,
  reducers: {
    setPlayerglobalsAction: (
      state,
      action: PayloadAction<PlayerglobalType[]>
    ) => {
      state.playerglobals = action.payload;
    },
  },
});

export const { setPlayerglobalsAction } = counterSlice.actions;

export default counterSlice.reducer;
