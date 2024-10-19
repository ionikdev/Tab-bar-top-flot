import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User type
interface User {
  id: number;
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = {
        id: 1,
        email: action.payload.email,
        username: 'Damilola',
      };
      state.token = `token-${Math.random().toString(36).substr(2)}`;
    },

    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },

    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },

    logout: (state) => {
      state.token = null;
    },
  },
});

export const { setUser, setToken, login, logout } = authSlice.actions;
export default authSlice.reducer;
