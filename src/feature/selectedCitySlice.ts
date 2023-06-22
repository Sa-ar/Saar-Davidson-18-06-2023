import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { Location } from '@/types';

export type SelectedCityState = {
  location: Location;
  loading: boolean;
  error: string | null;
};

const initialState: SelectedCityState = {
  location: {
    "Version": 1,
    "Key": "215854",
    "Type": "City",
    "Rank": 31,
    "LocalizedName": "Tel Aviv",
    "Country": {
      "ID": "IL",
      "LocalizedName": "Israel"
    },
    "AdministrativeArea": {
      "ID": "TA",
      "LocalizedName": "Tel Aviv"
    }
  },
  loading: false,
  error: null,
};

export const selectedCitySlice = createSlice({
  name: 'selectedCity',
  initialState,
  reducers: {
    setSelectedCity: (state, action: PayloadAction<Location>) => {
      state.location = action.payload;
    }
  },
});

export const { setSelectedCity } = selectedCitySlice.actions;

export const selectSelectedCity = (state: RootState) => state.selectedCity.location;

export default selectedCitySlice.reducer;
