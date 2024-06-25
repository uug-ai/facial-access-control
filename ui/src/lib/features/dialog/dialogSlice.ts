import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DialogState {
  isVisible: boolean;
}

const initialState: DialogState = {
  isVisible: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    showDialog(state) {
      state.isVisible = true;
    },
    hideDialog(state) {
      state.isVisible = false;
    },
  },
});

export const { showDialog, hideDialog } = dialogSlice.actions;

export default dialogSlice.reducer;

