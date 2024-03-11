import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  isLoggedIn: boolean;
  userName: string;
}

const initialState: IState = {
  isLoggedIn: false,
  userName: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      if (!action || !action.payload) {
        return;
      }
      state.isLoggedIn = true;
      state.userName = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userName = "";
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
