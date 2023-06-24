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

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setCurrentLocation: (state, action: PayloadAction<Location>) => {
      state.currentLocation = action.payload;
    },
    addFavorite: (state) => {
      if (!state.favorites.find((favorite) => favorite === state.currentLocation)) {
        state.favorites = [...state.favorites, state.currentLocation];
      }
    },
    switchFavorite: (state) => {
      if (state.favorites.find((favorite) => favorite.Key === state.currentLocation.Key)) {
        state.favorites = state.favorites.filter(
          (favorite) => favorite.Key !== state.currentLocation.Key
        );
      } else {
        state.favorites = [...state.favorites, state.currentLocation];
      }
    },
    removeFavorite: (state, action: PayloadAction<Location>) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite.Key !== action.payload.Key
      );
    }
  },
});

export const { setCurrentLocation, addFavorite, removeFavorite, switchFavorite } = locationsSlice.actions;

export const selectCurrentLocation = (state: RootState) => state.locations.currentLocation;
export const selectFavorites = (state: RootState) => state.locations.favorites;

export default locationsSlice.reducer;
