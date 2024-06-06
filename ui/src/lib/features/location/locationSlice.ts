import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Partial<Location> = {
  id: 0,
  name: "",
  address: "",
  lat: 0,
  lng: 0,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Location>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.address = action.payload.address;
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
    clearLocation: (state) => {
      state.id = 0;
      state.name = "";
      state.address = "";
      state.lat = 0;
      state.lng = 0;
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
