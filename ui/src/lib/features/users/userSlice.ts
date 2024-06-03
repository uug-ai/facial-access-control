import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: User = {
  id: 0,
  firstname: "",
  lastname: "",
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
    setUser: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.role = action.payload.role;
      state.installed = action.payload.installed;
      state.language = action.payload.language;
    },
    clearUser: (state) => {
      state.id = 0;
      state.firstname = "";
      state.lastname = "";
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
