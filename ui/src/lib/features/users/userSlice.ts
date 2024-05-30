import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// username or firstName, lastName?
interface UserState {
  id: number;
  userName: string;
  email: string;
  password: string;
  role: string;
  installed: boolean;
  language: string;
}

const initialState: UserState = {
  id: 0,
  userName: "",
  email: "",
  password: "",
  role: "",
  installed: false,
  language: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.role = action.payload.role;
      state.installed = action.payload.installed;
      state.language = action.payload.language;
    },
    clearUser: (state) => {
      state.id = 0;
      state.userName = "";
      state.email = "";
      state.password = "";
      state.role = "";
      state.installed = false;
      state.language = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
