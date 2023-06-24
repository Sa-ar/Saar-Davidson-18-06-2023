// pages slice
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

type Page = {
  label: string;
  number: number;
};

export type PagesState = {
  currentPageNumber: number;
  pages: Page[];
};

const initialState: PagesState = {
  currentPageNumber: 0,
  pages: [{ label: 'Home', number: 0 }, { label: 'Favorites', number: 1 }],
};

export const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setCurrentPageNumber: (state, action: PayloadAction<number>) => {
      if (state.pages.some(page => page.number === action.payload)) {
        state.currentPageNumber = action.payload;
      }
    }
  },
});

export const { setCurrentPageNumber } = pagesSlice.actions;

export const selectCurrentPageNumber = (state: RootState) => state.pages.currentPageNumber;
export const selectPages = (state: RootState) => state.pages.pages;

export default pagesSlice.reducer;
