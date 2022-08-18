import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, useAppDispatch } from "../store";

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token: null } as {
    user: null | any;
    token: null | string;
  },
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: any; token: string }>
    ) => {
      state.user = user;
      state.token = token;
    },
    setAuthenticated: (state, { payload }) => {
      state.token = payload.token;
    },
    userLogout: (state) => {
      state.token = null;
    }
  },
  extraReducers: (builder) => {}
});

export const { setCredentials, userLogout, setAuthenticated } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.token;
