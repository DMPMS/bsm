import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RuleType } from "../../../types/Rule.type";

interface RuleState {
  rules: RuleType[];
}

const initialState: RuleState = {
  rules: [],
};

export const counterSlice = createSlice({
  name: "ruleReducer",
  initialState,
  reducers: {
    setRulesAction: (state, action: PayloadAction<RuleType[]>) => {
      state.rules = action.payload;
    },
  },
});

export const { setRulesAction } = counterSlice.actions;

export default counterSlice.reducer;
