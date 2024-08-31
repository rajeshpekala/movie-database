import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string | null;
  token: string | null;
}

const initialState: AuthState = {
  email: localStorage.getItem("email") || null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; token: string }>) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.email = null;
      state.token = null;
      localStorage.removeItem("email");
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
