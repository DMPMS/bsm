import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ManagerglobalType } from "../../../types/Managerglobal.type";

interface ManagerglobalState {
  managerglobal?: ManagerglobalType;
  managerglobals: ManagerglobalType[];
}

const initialState: ManagerglobalState = {
  managerglobal: undefined,
  managerglobals: [],
};

export const counterSlice = createSlice({
  name: "managerglobalReducer",
  initialState,
  reducers: {
    setManagerglobalAction: (
      state,
      action: PayloadAction<ManagerglobalType | undefined>,
    ) => {
      state.managerglobal = action.payload;
    },
    setManagerglobalsAction: (
      state,
      action: PayloadAction<ManagerglobalType[]>,
    ) => {
      state.managerglobals = action.payload;
    },
  },
});

export const { setManagerglobalAction, setManagerglobalsAction } =
  counterSlice.actions;

export default counterSlice.reducer;
