import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { Location } from '@/types';

export type LocationsState = {
  currentLocation: Location;
  favorites: Location[];
};

const initialState: LocationsState = {
  currentLocation: {
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
  favorites: [],
};

export const selectedCitySlice = createSlice({
  name: 'selectedCity',
  initialState,
  reducers: {
    setSelectedCity: (state, action: PayloadAction<Location>) => {
      state.currentLocation = action.payload;
    },
    addFavorite: (state) => {
      if (!state.favorites.find((favorite) => favorite === state.currentLocation)) {
        state.favorites = [...state.favorites, state.currentLocation];
      }
    },
    removeFavorite: (state, action: PayloadAction<Location>) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite !== action.payload
      );
    }
  },
});

export const { setSelectedCity, addFavorite, removeFavorite } = selectedCitySlice.actions;

export const selectSelectedCity = (state: RootState) => state.selectedCity.currentLocation;
export const selectFavorites = (state: RootState) => state.selectedCity.favorites;

export default selectedCitySlice.reducer;
