import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CompetitionglobalType } from "../../../types/Competitionglobal.type";
interface CompetitionglobalState {
  competitionglobal?: CompetitionglobalType;
  competitionglobals: CompetitionglobalType[];
}

const initialState: CompetitionglobalState = {
  competitionglobal: undefined,
  competitionglobals: [],
};

export const counterSlice = createSlice({
  name: "competitionglobalReducer",
  initialState,
  reducers: {
    setCompetitionglobalAction: (
      state,
      action: PayloadAction<CompetitionglobalType | undefined>,
    ) => {
      state.competitionglobal = action.payload;
    },
    setCompetitionglobalsAction: (
      state,
      action: PayloadAction<CompetitionglobalType[]>,
    ) => {
      state.competitionglobals = action.payload;
    },
  },
});

export const { setCompetitionglobalAction, setCompetitionglobalsAction } =
  counterSlice.actions;

export default counterSlice.reducer;
