import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ManagerglobalType } from "../../../types/Managerglobal.type";

interface ManagerglobalState {
  managerglobals: ManagerglobalType[];
}

const initialState: ManagerglobalState = {
  managerglobals: [],
};

export const counterSlice = createSlice({
  name: "managerglobalReducer",
  initialState,
  reducers: {
    setManagerglobalsAction: (
      state,
      action: PayloadAction<ManagerglobalType[]>
    ) => {
      state.managerglobals = action.payload;
    },
  },
});

export const { setManagerglobalsAction } = counterSlice.actions;

export default counterSlice.reducer;
