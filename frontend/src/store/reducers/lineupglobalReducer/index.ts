import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LineupglobalType } from "../../../types/Lineupglobal.type";

interface LineupglobalState {
  lineupglobal?: LineupglobalType;
  lineupglobals: LineupglobalType[];
}

const initialState: LineupglobalState = {
  lineupglobal: undefined,
  lineupglobals: [],
};

export const counterSlice = createSlice({
  name: "lineupglobalReducer",
  initialState,
  reducers: {
    setLineupglobalAction: (
      state,
      action: PayloadAction<LineupglobalType | undefined>,
    ) => {
      state.lineupglobal = action.payload;
    },
    setLineupglobalsAction: (
      state,
      action: PayloadAction<LineupglobalType[]>,
    ) => {
      state.lineupglobals = action.payload;
    },
  },
});

export const { setLineupglobalAction, setLineupglobalsAction } =
  counterSlice.actions;

export default counterSlice.reducer;
