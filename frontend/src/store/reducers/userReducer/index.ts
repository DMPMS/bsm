import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "../../../types/User.type";

interface UserState {
  users: UserType[];
}

const initialState: UserState = {
  users: [],
};

export const counterSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUsersAction: (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsersAction } = counterSlice.actions;

export default counterSlice.reducer;
