import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TeamglobalType } from "../../../types/Teamglobal.type";

interface TeamglobalState {
  teamglobals: TeamglobalType[];
}

const initialState: TeamglobalState = {
  teamglobals: [],
};

export const counterSlice = createSlice({
  name: "teamglobalReducer",
  initialState,
  reducers: {
    setTeamglobalsAction: (state, action: PayloadAction<TeamglobalType[]>) => {
      state.teamglobals = action.payload;
    },
  },
});

export const { setTeamglobalsAction } = counterSlice.actions;

export default counterSlice.reducer;
