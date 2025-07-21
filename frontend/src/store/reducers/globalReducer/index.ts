import type { UserType } from "../../../types/User.type";
import type { NotificationType } from "../../../types/Notification.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  user?: UserType;
  notification?: NotificationType;
}

const initialState: GlobalState = {
  user: undefined,
  notification: undefined,
};

export const counterSlice = createSlice({
  name: "globalReducer",
  initialState,
  reducers: {
    setUserAction: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    setNotificationAction: (state, action: PayloadAction<NotificationType>) => {
      state.notification = action.payload;
    },
  },
});

export const { setUserAction, setNotificationAction } = counterSlice.actions;

export default counterSlice.reducer;
