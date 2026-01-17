import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CompetitionglobalType } from "../../../types/Competitionglobal.type";
interface CompetitionglobalState {
  competitionglobals: CompetitionglobalType[];
}

const initialState: CompetitionglobalState = {
  competitionglobals: [],
};

export const counterSlice = createSlice({
  name: "competitionglobalReducer",
  initialState,
  reducers: {
    setCompetitionglobalsAction: (
      state,
      action: PayloadAction<CompetitionglobalType[]>
    ) => {
      state.competitionglobals = action.payload;
    },
  },
});

export const { setCompetitionglobalsAction } = counterSlice.actions;

export default counterSlice.reducer;
