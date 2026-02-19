import type { UserType } from "../../../types/User.type";
import type { NotificationType } from "../../../types/Notification.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SettingsglobalType } from "../../../types/Settingsglobal.type";

interface GlobalState {
  user?: UserType;
  settingsglobal?: SettingsglobalType;
  notification?: NotificationType;
}

const initialState: GlobalState = {
  user: undefined,
  settingsglobal: undefined,
  notification: undefined,
};

export const counterSlice = createSlice({
  name: "globalReducer",
  initialState,
  reducers: {
    setUserAction: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    setSettingsglobalAction: (
      state,
      action: PayloadAction<SettingsglobalType>,
    ) => {
      state.settingsglobal = action.payload;
    },
    setNotificationAction: (state, action: PayloadAction<NotificationType>) => {
      state.notification = action.payload;
    },
  },
});

export const { setUserAction, setSettingsglobalAction, setNotificationAction } =
  counterSlice.actions;

export default counterSlice.reducer;
