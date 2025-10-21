import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PositionType } from "../../../types/Position.type";

interface PositionState {
  positions: PositionType[];
}

const initialState: PositionState = {
  positions: [],
};

export const counterSlice = createSlice({
  name: "positionReducer",
  initialState,
  reducers: {
    setPositionsAction: (state, action: PayloadAction<PositionType[]>) => {
      state.positions = action.payload;
    },
  },
});

export const { setPositionsAction } = counterSlice.actions;

export default counterSlice.reducer;
