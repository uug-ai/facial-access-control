import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LocationState {
  Id: number;
  Name: string;
  Address: string;
  Lat: number;
  Lng: number;
}

const initialState: LocationState = {
  Id: 0,
  Name: "",
  Address: "",
  Lat: 0,
  Lng: 0,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<LocationState>) => {
      state.Id = action.payload.Id;
      state.Name = action.payload.Name;
      state.Address = action.payload.Address;
      state.Lat = action.payload.Lat;
      state.Lng = action.payload.Lng;
    },
    clearLocation: (state) => {
      state.Id = 0;
      state.Name = "";
      state.Address = "";
      state.Lat = 0;
      state.Lng = 0;
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;