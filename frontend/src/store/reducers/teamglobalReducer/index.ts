import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TeamglobalType } from "../../../types/Teamglobal.type";

interface TeamglobalState {
  teamglobal?: TeamglobalType;
  teamglobals: TeamglobalType[];
}

const initialState: TeamglobalState = {
  teamglobal: undefined,
  teamglobals: [],
};

export const counterSlice = createSlice({
  name: "teamglobalReducer",
  initialState,
  reducers: {
    setTeamglobalAction: (
      state,
      action: PayloadAction<TeamglobalType | undefined>,
    ) => {
      state.teamglobal = action.payload;
    },
    setTeamglobalsAction: (state, action: PayloadAction<TeamglobalType[]>) => {
      state.teamglobals = action.payload;
    },
  },
});

export const { setTeamglobalAction, setTeamglobalsAction } =
  counterSlice.actions;

export default counterSlice.reducer;
